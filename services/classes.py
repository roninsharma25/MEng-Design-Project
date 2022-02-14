# classes.py: Endpoints for reading and writing Classes database
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

from urllib import request
from flask import *
import services.databases as db

classes = Blueprint('classes', __name__, url_prefix='/classes')

@classes.route('/all', methods=['GET'])
def getAll():
    result = db.getAll('Classes', 'CornellUniversity')
    return {"result": result}


@classes.route('/', methods=['GET'])
def getOne():
    result = db.getOne('Classes', 'CornellUniversity', request.args.get('id'))
    return {"result": result}


@classes.route('/', methods=['PATCH'])
def patch():
    success = db.patch('Classes', 'CornellUniversity', request.args.get('id'), request.json)
    result = {"success": success}
    result["message"] = "Class successfully updated" if success else "Class unsuccessfully updated"
    return result


@classes.route('/', methods=['POST'])
def post():
    success = db.post('Classes', 'CornellUniversity', request.json)
    result = {"success": success}
    result["message"] = "Class successfully added" if success else "Class unsuccessfully added"
    return result


@classes.route('/', methods=['DELETE'])
def delete():
    success = db.delete('Classes', 'CornellUniversity', request.json["_id"])
    result = {"success": success}
    result["message"] = "Class successfully removed" if success else "Class unsuccessfully removed"
    return result
