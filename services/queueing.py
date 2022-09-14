from flask import *
from constants import *
from datetime import datetime
from database_utils import *

import requests

app = Flask(__name__, static_url_path = '')

@app.route('/')
def example():
    return {'message': 'Hello World'}

@app.route('/test')
def testGet():
    return 'Queueing!'

@app.route('/posting')
def testPosting():
    response = requests.get(f'http://127.0.0.1:{postingPort}/test')
    
    return response.text

@app.route('/all', methods = ['GET'])
def getAllQueueEntries():
    result = getAll('Queues', 'Cornell_University')

    return {'result': str(result)}

@app.route('/', methods = ['POST'])
def createQueueEntry():
    postRequest = request.json
    postRequest['timeUpdated'] = str(datetime.now())

    # Get current queue entries in the same class
    otherQueueEntries = getSome('Queues', 'Cornell_University', {'class': postRequest['class']})
    
    # Set queue position
    postRequest['queuePosition'] = len(otherQueueEntries) + 1

    result = post('Queues', 'Cornell_University', postRequest)

    return {'result': result}

# FIX THIS ENDPOINT
@app.route('/', methods = ['DELETE'])
def removeQueueEntry():
    deleteRequest = request.json
    result = delete('Queues', 'Cornell_University', deleteRequest)

    # Decrement queue positions
    patch('Queues', 'Cornell_University', {'class': deleteRequest['class']}, {'$inc': {'queuePosition': -1}}, True)

    return {'result': result}

@app.route('/emptyQueue', methods = ['DELETE'])
def emptyQueue():
    deleteRequest = request.json
    result = delete('Queues', 'Cornell_University', deleteRequest, True)

    return {'result': result}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=queueingPort)