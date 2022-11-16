from flask import *
from flask_cors import CORS
from constants import *
from datetime import datetime
from database_utils import *

import requests

app = Flask(__name__, static_url_path = '')
CORS(app, support_credentials = True)

@app.route('/all', methods = ['GET'])
def getAllUsers():
    result = getAll('Users', 'Cornell_University')

    return jsonify({'result': result})

@app.route('/oneUser', methods = ['GET'])
def getUser():
    user = getOne('Users', 'Cornell_University', {'Email': request.args.get('email')})
    response = jsonify({'result': user})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/', methods = ['POST'])
def createUser():
    result = post('Users', 'Cornell_University', request.json)

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

    return {'result': result}

@app.route('/', methods = ['PATCH'])
def addClassToUser():
    userDetails = request.json['userDetails']

    # Get the classes the user is already in
    user = getOne('Users', 'Cornell_University', userDetails)

    # Add the new class to that list
    user['classes'].append(request.json['newClass'])

    # Remove IDs
    userDetails.pop('_id', None)
    user.pop('_id', None)

    # Submit the patch request
    result = patch('Users', 'Cornell_University', userDetails, user)

    return {'result': result}

@app.route('/', methods = ['DELETE'])
def deleteUser():
    result = delete('Users', 'Cornell_University', request.json)

    return {'result': result}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=usersPort)
