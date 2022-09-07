# users.py: Endpoints for reading and writing Schools database
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

import services.databases as db
import json

from urllib import request
from flask import *
from services.storage import *

users = Blueprint('users', __name__, url_prefix='/users')

@users.route('/all', methods=['GET'])
def getAll():
    result = db.getAll('Users', 'Cornell_University')
    return {"result": result}


@users.route('/some', methods=['GET'])
def getSome():
    print(request.json)
    result = db.getSome('Users', 'Cornell_University', request.json)
    return {"result": result}


@users.route('/one', methods=['GET'])
def getOne():
    result = db.getOne('Users', 'Cornell_University', request.json)
    return {"result": result}


@users.route('/', methods=['PATCH'])
def patch():
    json = request.json
    success = db.patch('Users', 'Cornell_University', json['searchData'], json['newData'])
    result = {"success": success}
    result["message"] = "User successfully updated" if success else "User unsuccessfully updated"
    return result


@users.route('/', methods=['POST'])
def post():
    success = db.post('Users', 'Cornell_University', request.json)
    result = {"success": success}
    result["message"] = "User successfully created" if success else "User unsuccessfully created"
    return result


@users.route('/', methods=['DELETE'])
def delete():
    success = db.delete('Users', 'Cornell_University', request.json)
    result = {"success": success}
    result["message"] = "User successfully removed" if success else "User unsuccessfully removed"
    return result
