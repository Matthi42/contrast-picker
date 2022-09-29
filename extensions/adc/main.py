import sys
import logging
import websocket
import argparse
import uuid
import json
import board
import busio
import adafruit_ads1x15.ads1115 as ADS
from adafruit_ads1x15.analog_in import AnalogIn

# Configuring logger
logging.basicConfig(
    filename='adc-extension-logs.log', 
    encoding='utf-8', 
    level=logging.INFO,
    format='%(levelname)s: %(asctime)s %(message)s', 
    datefmt='%Y-%d-%m %H:%M:%S'
    )

# Parsing Command Line Arguments from Neutralinojs
# see https://neutralino.js.org/docs/how-to/extensions-overview#connecting-an-extension-with-neutralinojs
parser = argparse.ArgumentParser(prog='PROG')
parser.add_argument('--nl-port')
parser.add_argument('--nl-token')
parser.add_argument('--nl-extension-id')
sys.argv.pop(0)
args = parser.parse_args(sys.argv)
PORT = args.nl_port
TOKEN = args.nl_token
EXTENSION_ID = args.nl_extension_id

# setup the i2c-bus and the ADC
# see https://docs.circuitpython.org/projects/ads1x15/en/latest/

# Create the I2C bus
i2c = busio.I2C(board.SCL, board.SDA)
# Create the ADC object using the I2C bus
ads = ADS.ADS1115(i2c)
# Create single-ended input on channel 0
chan0 = AnalogIn(ads, ADS.P0)


# WebSocket Communication with Application
# Handler for messages from Neutralinojs app
def on_message(wsapp, m):
    message = json.loads(m)
    if 'event' in message: 
        if message['event'] == 'adc-chan0':
            adc_value = chan0.value
            result = {
                'id': str(uuid.uuid4()),
                'data' : {
                    'event': 'adc-chan0',
                    'data': adc_value
                    },
                'accessToken' : TOKEN,
                'method' : 'app.broadcast'
            }
            wsapp.send(json.dumps(result))

# Exiting the Process when the WS connection is lost. (e.g. when the App is closed)
# see https://neutralino.js.org/docs/how-to/extensions-overview#terminating-an-extension-instance
def on_close(wsapp, status_code, close_message):
    logging.info('WS Connenction closed')
    sys.exit()

# Connecting Extension to the Neutralinojs Process with websockets
wsapp = websocket.WebSocketApp (
    url = f'ws://localhost:{PORT}?extensionId={EXTENSION_ID}',
    on_message = on_message,
    on_close = on_close,
    on_open = lambda wsapp : logging.info('WS Connenction open'),
    on_error = lambda wsapp, error : logging.error(str(error))
    )

wsapp.run_forever()
