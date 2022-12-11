from flask import *
from flask_cors import CORS
from constants import *
from datetime import datetime
from database_utils import *

import requests

app = Flask(__name__, static_url_path = '')
CORS(app, support_credentials = True)

@app.route('/')
def example():
    return {'message': 'Hello World'}

@app.route('/all', methods = ['GET'])
def getAllStackEntries():
    result = getAll('Stacks', 'Cornell_University')

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/one', methods = ['GET'])
def getOneStackEntry():
    criteria = request.args.get('criteria')
    value = request.args.get('value')
    
    result = getOne('Stacks', 'Cornell_University', {criteria: value})

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/', methods = ['POST'])
def createStackEntry(args = None):
    postRequest = args if args is not None else request.json
    postRequest['timeUpdated'] = str(datetime.now())

    # Get current queue entries in the same class
    otherQueueEntries = getSome('Stacks', 'Cornell_University', {'class': postRequest['class']})
    
    # Set queue position
    postRequest['stackPosition'] = len(otherQueueEntries) + 1

    # Set the assigned TA
    postRequest['assignedTA'] = ''

    result = post('Stacks', 'Cornell_University', postRequest)

    return {'result': result}

@app.route('/updateStackEntry', methods = ['PATCH'])
def updateStackEntry(details = None, modifications = None):
    details = details if details is not None else request.json['stackEntryDetails']
    modifications = modifications if modifications is not None else request.json['stackEntryModifications']
    result = patch('Stacks', 'Cornell_University', details, modifications)

    return {'result': result}

@app.route('/', methods = ['DELETE'])
def removeStackEntry(deleteRequest = None):
    deleteRequest = deleteRequest if deleteRequest is not None else request.json
    
    # Delete the queue entry
    result1 = delete('Stacks', 'Cornell_University', deleteRequest)

    return {'result': result1}

@app.route('/emptyStack', methods = ['DELETE'])
def emptyStack():
    deleteRequest = request.json
    result = delete('Stacks', 'Cornell_University', deleteRequest, True)

    return {'result': result}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=stackPort)