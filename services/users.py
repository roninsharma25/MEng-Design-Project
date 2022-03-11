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
    result = db.getAll('Users', 'CornellUniversity')
    return {"result": result}


@users.route('/some', methods=['GET'])
def getSome():
    result = db.getSome('Users', 'CornellUniversity', request.json)
    return {"result": result}


@users.route('/', methods=['GET'])
def getOne():
    result = db.getOne('Users', 'CornellUniversity', request.args.get('id'))
    return {"result": result}


@users.route('/', methods=['PATCH'])
def patch():
    success = db.patch('Users', 'CornellUniversity', request.args.get('id'), request.json)
    result = {"success": success}
    result["message"] = "User successfully updated" if success else "User unsuccessfully updated"
    return result


@users.route('/', methods=['POST'])
def post():
    success = db.post('Users', 'CornellUniversity', request.json)
    result = {"success": success}
    result["message"] = "User successfully added" if success else "User unsuccessfully added"
    return result


@users.route('/', methods=['DELETE'])
def delete():
    success = db.delete('Users', 'CornellUniversity', request.json["_id"])
    result = {"success": success}
    result["message"] = "User successfully removed" if success else "User unsuccessfully removed"
    return result
