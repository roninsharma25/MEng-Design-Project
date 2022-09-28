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
    return 'Posting!'

@app.route('/queueing')
def testQueuing():
    response = requests.get(f'http://127.0.0.1:{queueingPort}/test')
    
    return response.text

@app.route('/all', methods = ['GET'])
def getAllPosts():
    result = getAll('Posts', 'Cornell_University')

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/', methods = ['POST'])
def createPost():
    postRequest = request.json
    postRequest['timeUpdated'] = str(datetime.now())
    postRequest['answers'] = []
    result = post('Posts', 'Cornell_University', postRequest)

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/', methods = ['PATCH'])
def updatePost():
    patchRequest = request.json
    patchRequest['timeUpdated'] = str(datetime.now())
    postDetails = patchRequest['postDetails']
    result = patch('Posts', 'Cornell_University', postDetails, patchRequest)

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/addAnswerToPost', methods = ['PATCH'])
def addAnswerToPost():
    print(request.json)
    patchRequest = request.json
    patchRequest['timeUpdated'] = str(datetime.now())
    postDetails = patchRequest['postDetails']

    # Get the list of current answers for the post
    post = getOne('Posts', 'Cornell_University', postDetails)
    answers = post['answers']

    # Add the new answer to that list
    answers.append(patchRequest['newAnswer'])
    post['answers'] = answers

    # Remove IDs
    postDetails.pop('_id', None)
    post.pop('_id', None)

    # Submit the patch request
    result = patch('Posts', 'Cornell_University', postDetails, post)

    response = jsonify({'result': result})
    #response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/updateAnswerToPost', methods = ['PATCH'])
def updateAnswerToPost():
    patchRequest = request.json
    patchRequest['timeUpdated'] = str(datetime.now())
    postDetails = patchRequest['postDetails']

    # Get the list of current answers for the post
    post = getOne('Posts', 'Cornell_University', postDetails)
    answers = post['answers']

    # Update the one answer
    for answer in answers:
        if answer['answer'] == patchRequest['oldAnswer']:
            answers[answers.index(answer)]['answer'] = patchRequest['newAnswer']
            break

    post['answers'] = answers

    # Remove IDs
    postDetails.pop('_id', None)
    post.pop('_id', None)

    # Submit the patch request
    result = patch('Posts', 'Cornell_University', postDetails, post)

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

@app.route('/', methods = ['DELETE'])
def deletePost():
    deleteRequest = request.json
    result = delete('Posts', 'Cornell_University', deleteRequest)

    response = jsonify({'result': result})
    response.headers.add('Access-Control-Allow-Origin', '*')

    return response

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=postingPort)