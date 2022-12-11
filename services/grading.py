from flask import *
from flask_cors import CORS
from constants import *
from datetime import datetime
from database_utils import *

import requests
import json

app = Flask(__name__, static_url_path = '')
CORS(app, support_credentials = True)

@app.route('/')
def example():
    return {'message': 'Hello World'}

@app.route('/all', methods = ['GET'])
def getStudentGrades():
    email = request.args.get('email')

    result = getOne('Grades', 'Cornell_University', {'email': email})

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/', methods = ['POST'])
def createStudentGrades():
    postRequest = request.json
    postRequest['timeUpdated'] = str(datetime.now())
    result = post('Grades', 'Cornell_University', postRequest)

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/', methods = ['DELETE'])
def deleteStudentGrades():
    deleteRequest = request.json
    result = delete('Grades', 'Cornell_University', deleteRequest)

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=gradingPort)