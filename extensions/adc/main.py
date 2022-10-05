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
chan1 = AnalogIn(ads, ADS.P1)
chan2 = AnalogIn(ads, ADS.P2)
chan3 = AnalogIn(ads, ADS.P3)


# WebSocket Communication with Application
# Handler for messages from Neutralinojs app
def on_message(wsapp, m):
    message = json.loads(m)
    if 'event' in message: 
        # check if a adc at the expected bus adress is present
        if message['event'] == 'adc-detect':
            wsapp.send(json.dumps({}))
        # The four chanels of the ADC can be read seperatly or all at once
        if message['event'] == 'adc-chan0':
            result = adc_result_msg(chan0.value, 'adc-chan0')
            wsapp.send(json.dumps(result))
        if message['event'] == 'adc-chan1':
            result = adc_result_msg(chan1.value, 'adc-chan1')
            wsapp.send(json.dumps(result))
        if message['event'] == 'adc-chan2':
            result = adc_result_msg(chan2.value, 'adc-chan2')
            wsapp.send(json.dumps(result))
        if message['event'] == 'adc-chan3':
            result = adc_result_msg(chan3.value, 'adc-chan3')
            wsapp.send(json.dumps(result))
        if message['event'] == 'adc-chan-all':
            result = adc_result_msg([ chan0.value, chan1.value, chan2.value, chan3.value ], 'adc-chan-all')
            wsapp.send(json.dumps(result))
         
# constructs a dictionary of the result data 
def adc_result_msg(value, event):
    return {
        'id': str(uuid.uuid4()),
        'data' : {
            'event': event,
            'data': value
            },
        'accessToken' : TOKEN,
        'method' : 'app.broadcast'
    }



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
