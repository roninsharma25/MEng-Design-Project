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
def getAllChatMessages():
    result = getAll('GlobalChat', 'Cornell_University')

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/recent', methods = ['GET'])
def recentChatMessages():
    num_messages = int(request.args.get('num_messages'))
    result = getRecent('GlobalChat', 'Cornell_University', num_messages)

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/', methods = ['POST'])
def createChatMessage():
    result = post('GlobalChat', 'Cornell_University', request.json)

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/clearChat', methods = ['DELETE'])
def clearChatMessages():
    pass

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=globalChatPort)