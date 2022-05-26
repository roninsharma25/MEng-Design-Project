# posts.py: Endpoints for reading and writing Posts database
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

from urllib import request
from flask import *
from services.storage import *
from datetime import datetime
from bson import json_util
import services.databases as db
import services.users as users
import json



posts = Blueprint('posts', __name__, url_prefix='/posts')

@posts.route('/all', methods=['GET'])
def getAll():
    result = db.getAll('Posts', 'Cornell_University', False, 'JAM_1110')
    result = json.loads(json_util.dumps(result))

    return {"result": result}


@posts.route('/some', methods=['GET'])
def getSome():
    result = db.getSome('Posts', 'Cornell_University', request.json)
    return {"result": result}


@posts.route('/', methods=['GET'])
def getOne():
    result = db.getOne('Posts', 'Cornell_University', request.args.get('id'))
    return {"result": result}


@posts.route('/', methods=['PATCH'])
def patch():
    success = db.patch('Posts', 'Cornell_University', request.args.get('id'), request.json)
    result = {"success": success}
    result["message"] = "Post successfully updated" if success else "Post unsuccessfully updated"
    return result


@posts.route('/', methods=['POST'])
def post():
    postRequest = request.json
    postRequest['timeAdded'] = str(datetime.now())
    user = users.getOneByEmail(postRequest['email'])
    print("RESULT")
    print
    print(user['result2'])
    postRequest['author'] = user['result2'] #.to_json()
    postRequest['author']['_id'] = user['userID']
    print('REQUEST')
    print(postRequest)
    post = Post(**postRequest)

    success = db.post('Posts', 'Cornell_University', post.to_bson())

    postId = success[1]
    result = {"success": success[0]}
    result["message"] = "Post successfully added" if success else "Post unsuccessfully added"
    
    return result


@posts.route('/', methods=['DELETE'])
def delete():
    success = db.delete('Posts', 'Cornell_University', request.json["_id"])
    result = {"success": success}
    result["message"] = "Post successfully removed" if success else "Post unsuccessfully removed"
    return result

@posts.route('/addAnswerToPost', methods=['PATCH'])
def addAnswerToPost():
    patchRequest = request.json # include post id
    patchRequest['timeUpdated'] = str(datetime.now())
    
    class_ = 'JAM_1110' #request.json['class']
    id = request.json['_id']
    user = users.getOneByEmail(patchRequest['email'])

    author = user['result2']
    author['_id'] = user['userID']
    author['class_'] = 'JAM_1110'
    user = User(**author)

    
    # Based on the post id, get the post object
    post = Post(**db.getOne('Posts', 'Cornell_University', id, False, class_))
    post.addAnswer(user, request.json['answer'])


    success = db.patch('Posts', 'Cornell_University', id, post.to_bson(), False, class_)
    result = {"success": success}
    result["message"] = "Post successfully updated" if success else "Post unsuccessfully updated"
    return result

