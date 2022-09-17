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

    return {'result': result}

@app.route('/', methods = ['POST'])
def createQueueEntry():
    postRequest = request.json
    postRequest['timeUpdated'] = str(datetime.now())

    # Get current queue entries in the same class
    otherQueueEntries = getSome('Queues', 'Cornell_University', {'class': postRequest['class']})
    
    # Set queue position
    postRequest['queuePosition'] = len(otherQueueEntries) + 1

    # Set the assigned TA
    postRequest['assignedTA'] = ''

    result = post('Queues', 'Cornell_University', postRequest)

    return {'result': result}

@app.route('/updateQueueEntry', methods = ['PATCH'])
def updateQueueEntry():
    result = patch('Queues', 'Cornell_University', request.json['queueEntryDetails'], request.json['queueEntryModifications'])

    return {'result': result}

@app.route('/', methods = ['DELETE'])
def removeQueueEntry():
    deleteRequest = request.json
    
    # Get the queue position of this entry
    queuePosition = getOne('Queues', 'Cornell_University', deleteRequest)['queuePosition']

    # Delete the queue entry
    result1 = delete('Queues', 'Cornell_University', deleteRequest)

    # Decrement queue positions
    result2 = patch('Queues', 'Cornell_University', {'class': deleteRequest['class'], 'queuePosition': {'$gte': queuePosition}}, {'$inc': {'queuePosition': -1}}, True)

    return {'result': result1 and result2}

@app.route('/emptyQueue', methods = ['DELETE'])
def emptyQueue():
    deleteRequest = request.json
    result = delete('Queues', 'Cornell_University', deleteRequest, True)

    return {'result': result}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=queueingPort)