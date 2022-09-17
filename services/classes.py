from flask import *
from constants import *
from datetime import datetime
from database_utils import *

import requests

app = Flask(__name__, static_url_path = '')

@app.route('/all', methods = ['GET'])
def getAllClasses():
    result = getAll('Classes', 'Cornell_University')

    return {'result': result}

@app.route('/oneClass', methods = ['GET'])
def getClass():
    user = getOne('Classes', 'Cornell_University', request.json)

    return {'result': user}

@app.route('/', methods = ['POST'])
def createClass():
    result = post('Classes', 'Cornell_University', request.json)

    return {'result': result}

@app.route('/updateClass', methods = ['PATCH'])
def updateClass():
    result = patch('Classes', 'Cornell_University', request.json['classDetails'], request.json['classModifications'])

    return {'result': result}

@app.route('/', methods = ['DELETE'])
def deleteClass():
    result = delete('Classes', 'Cornell_University', request.json)

    return {'result': result}

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=classesPort)
