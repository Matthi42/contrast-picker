import sys
import logging
import websocket
import argparse
import uuid
import json


# Configuring logger
logging.basicConfig(
    filename='tts-extension-logs.log', 
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

# WebSocket Communication with Application
# Handler for messages from Neutralinojs app
def on_message(wsapp, m):
    message = json.loads(m)
    if 'event' in message: 
        if message['event'] == 'speak':
            logging.info(str(message))


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
