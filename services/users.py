# users.py: Endpoints for reading and writing Schools database
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

from urllib import request
from flask import *
import services.databases as db

users = Blueprint('users', __name__, url_prefix='/users')

@users.route('/all', methods=['GET'])
def getAll():
    result = db.getAll('Users', 'Cornell_University')
    return {"result": result}


@users.route('/some', methods=['GET'])
def getSome():
    result = db.getSome('Users', 'Cornell_University', request.json)
    return {"result": result}


@users.route('/', methods=['GET'])
def getOne():
    result = db.getOne('Users', 'Cornell_University', request.args.get('id'))
    return {"result": result}

@users.route('/one', methods=['GET'])
def getOneByEmail():
    result = db.getCollection('Users', 'Cornell_University').find_one({'Email': request.args.get('email')})
    result['_id'] = str(result['_id'])

    return result


@users.route('/', methods=['PATCH'])
def patch():
    success = db.patch('Users', 'Cornell_University', request.args.get('id'), request.json)
    result = {"success": success}
    result["message"] = "User successfully updated" if success else "User unsuccessfully updated"
    return result


@users.route('/', methods=['POST'])
def post():
    success = db.post('Users', 'Cornell_University', request.json)
    result = {"success": success}
    result["message"] = "User successfully added" if success else "User unsuccessfully added"
    return result


@users.route('/', methods=['DELETE'])
def delete():
    success = db.delete('Users', 'Cornell_University', request.json["_id"])
    result = {"success": success}
    result["message"] = "User successfully removed" if success else "User unsuccessfully removed"
    return result
