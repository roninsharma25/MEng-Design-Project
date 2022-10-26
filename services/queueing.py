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

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/one', methods = ['GET'])
def getOneQueueEntry():
    criteria = request.args.get('criteria')
    value = request.args.get('value')
    
    result = getOne('Queues', 'Cornell_University', {criteria: value})

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/inQueue', methods = ['GET'])
def checkIfInQueue(criteria = None, value = None):
    criteria = criteria if criteria is not None else request.args.get('criteria')
    value = value if value is not None else request.args.get('value')
    
    try:
        result = getOne('Queues', 'Cornell_University', {criteria: value})
        result = True
    except:
        result = False

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/', methods = ['POST'])
def createQueueEntry(args = None):
    postRequest = args if args is not None else request.json
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
def updateQueueEntry(details = None, modifications = None):
    details = details if details is not None else request.json['queueEntryDetails']
    modifications = modifications if modifications is not None else request.json['queueEntryModifications']
    result = patch('Queues', 'Cornell_University', details, modifications)

    return {'result': result}

@app.route('/', methods = ['DELETE'])
def removeQueueEntry(deleteRequest = None):
    deleteRequest = deleteRequest if deleteRequest is not None else request.json
    
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