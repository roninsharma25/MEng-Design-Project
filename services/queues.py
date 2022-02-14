# queues.py: Endpoints for reading and writing Queues database
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

from urllib import request
from flask import *
import services.databases as db

queues = Blueprint('queues', __name__, url_prefix='/queues')

@queues.route('/all', methods=['GET'])
def getAll():
    result = db.getAll('Queues', 'CornellUniversity')
    return {"result": result}


@queues.route('/', methods=['GET'])
def getOne():
    result = db.getOne('Queues', 'CornellUniversity', request.args.get('id'))
    return {"result": result}


@queues.route('/', methods=['PATCH'])
def patch():
    success = db.patch('Queues', 'CornellUniversity', request.args.get('id'), request.json)
    result = {"success": success}
    result["message"] = "Query successfully updated" if success else "Query unsuccessfully updated"
    return result


@queues.route('/', methods=['POST'])
def post():
    success = db.post('Queues', 'CornellUniversity', request.json)
    result = {"success": success}
    result["message"] = "Query successfully added" if success else "Query unsuccessfully added"
    return result


@queues.route('/', methods=['DELETE'])
def delete():
    success = db.delete('Queues', 'CornellUniversity', request.json["_id"])
    result = {"success": success}
    result["message"] = "Query successfully removed" if success else "Query unsuccessfully removed"
    return result
