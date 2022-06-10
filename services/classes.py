# classes.py: Endpoints for reading and writing Classes database
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

from urllib import request
from flask import *
import services.databases as db
import services.users as users

classes = Blueprint('classes', __name__, url_prefix='/classes')

@classes.route('/all', methods=['GET'])
def getAll():
    result = db.getAll('Classes', 'Cornell_University')
    return {"result": result}


@classes.route('/some', methods=['GET'])
def getSome():
    result = db.getSome('Classes', 'Cornell_University', request.json)
    return {"result": result}


@classes.route('/one', methods=['GET'])
def getOne():
    result = db.getOne('Classes', 'Cornell_University', request.json)
    return {"result": result}


@classes.route('/', methods=['PATCH'])
def patch(data):
    json = data if data is not None else request.json
    success = db.patch('Classes', 'Cornell_University', json['searchData'], json['newData'])
    result = {"success": success}
    result["message"] = "Class successfully updated" if success else "Class unsuccessfully updated"
    return result

@classes.route('/', methods=['POST'])
def post():
    success = db.post('Classes', 'Cornell_University', request.json)
    result = {"success": success}
    result["message"] = "Class successfully added" if success else "Class unsuccessfully added"
    return result

# INCOMPLETE
@classes.route('/addUserToClass', methods=['PATCH'])
def addUserToClass(email = None, class_ = None):
    data = { 'email': email, 'class': class_ } if email is not None else request.json
    result = patch({ 'searchData': { 'email': data['email'] }, 'newData': data })
    result["message"] = "User successfully added to class" if "unsuccess" not in result["message"] else "User unsuccessfully added to class"
    return result


@classes.route('/', methods=['DELETE'])
def delete():
    success = db.delete('Classes', 'Cornell_University', request.json)
    result = {"success": success}
    result["message"] = "Class successfully removed" if success else "Class unsuccessfully removed"
    return result
