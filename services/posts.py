# posts.py: Endpoints for reading and writing Posts database
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

from urllib import request
from flask import *
from services.storage import *
import services.databases as db
import services.users as users
from datetime import datetime

posts = Blueprint('posts', __name__, url_prefix='/posts')

@posts.route('/all', methods=['GET'])
def getAll():
    result = db.getAll('Posts', 'Cornell_University')
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
    postRequest['author'] = user['result'].to_bson()
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
    class_ = request.json['class']
    id = request.json['_id']

    user = users.getOneByEmail(patchRequest['email'])['result']
    
    # Based on the post id, get the post object
    post = Post(**db.getOne('Posts', 'Cornell_University', id, False, class_))
    print()
    print(post)
    post.addAnswer(user, request.json['answer'])

    print('ADDED ANSWER')

    success = db.patch('Posts', 'Cornell_University', id, post.to_json(), False, class_)
    result = {"success": success}
    result["message"] = "Post successfully updated" if success else "Post unsuccessfully updated"
    return result

