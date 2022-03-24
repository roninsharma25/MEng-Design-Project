# posts.py: Endpoints for reading and writing Posts database
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

from urllib import request
from flask import *
import services.databases as db

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
    success = db.post('Posts', 'Cornell_University', request.json)
    result = {"success": success}
    result["message"] = "Post successfully added" if success else "Post unsuccessfully added"
    return result


@posts.route('/', methods=['DELETE'])
def delete():
    success = db.delete('Posts', 'Cornell_University', request.json["_id"])
    result = {"success": success}
    result["message"] = "Post successfully removed" if success else "Post unsuccessfully removed"
    return result
