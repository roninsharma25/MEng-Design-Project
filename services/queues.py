# queues.py: Endpoints for reading and writing Queues database
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

from urllib import request
from flask import *
from services.caches import queueingCache
from services.storage import Queue, QueueEntry, User
import services.databases as db

queues = Blueprint('queues', __name__, url_prefix='/queues')

@queues.route('/all', methods=['GET'])
def getAll():
    result = db.getAll('Queues', 'CornellUniversity')
    return {"result": result}


@queues.route('/some', methods=['GET'])
def getSome():
    result = db.getSome('Queues', 'CornellUniversity', request.json)
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

######

"""
Posting Memcached:
-Get filtered questions from database
-Write new question from the cache to the database

-In class
	-Create question (add to cache)
	-Read question (read from cache)


Queuing Memcached:
-Create a new queue for the OH slot
-Get X most recent entries from the database
-User can delete an element from the memcached queue (leave the queue)
-Write statistics to the database
"""

@queues.route('/cacheTestGet', methods=['GET'])
@queueingCache.cached()
def testGet():
    return str(queueingCache.get('queue').id)

@queues.route('/cacheTestPost', methods=['GET', 'POST'])
@queueingCache.cached(timeout = 1)
def testPost():
    input = request.args.get('test')
    return input

@queues.route('/createQueue', methods=['POST'])
@queueingCache.cached(timeout = 1)
def createQueue():
    queueID = request.args.get('queueID')
    queueingCache.set(f'queue-{queueID}', Queue(queueID))

    print("CREATING QUEUE")
    print(queueingCache.get(f'queue-{queueID}'))

    return "Success"

@queues.route('/addQueueEntry', methods=['POST'])
@queueingCache.cached(timeout = 1)
def addQueueEntry():
    queueID = request.args.get('queueID')

    queue = queueingCache.get(f'queue-{queueID}')
    print("QUEUE VALUE")
    print(queue)
    queue.addEntry(User("Bill", 0), "Test?", 0) # update with actual info
    queueingCache.set(f'queue-{queueID}', queue)

    return "Success"

@queues.route('/getQueue', methods=['GET'])
@queueingCache.cached(timeout = 1)
def getQueue():
    queueID = request.args.get('queueID')

    queue = queueingCache.get(f'queue-{queueID}')
    queueEntries = queue.getQueue()

    entries_str = ""
    for entry in queueEntries:
        entries_str += entry.question + " "
    
    entries_str += str(queue.numEntries)

    return {"data": entries_str}

@queues.route('/updateQueueDatabase', methods=['POST'])
@queueingCache.cached(timeout = 1)
def updateQueueDatabase():
    queueID = request.args.get('queueID')

    queue = queueingCache.get(f'queue-{queueID}')
    queue.updateDatabase('Cornell')

@queues.route('/getQueueStats', methods=['GET'])
@queueingCache.cached(timeout = 1)
def getQueueStats():
    queueID = request.args.get('queueID')

    queue = queueingCache.get(f'queue-{queueID}')
    databaseQueue = queue.getDatabaseQueue('Cornell')

    queueEntries = databaseQueue['Queue']
    avgRespTime = databaseQueue['Avg Resp Time']
    numPeopleHelped = databaseQueue['Num People Helped']

    return f'{queueEntries}, {avgRespTime}, {numPeopleHelped}'


### TEMPORARILY STORE EVERYTHING IN THE DATABASE

@queues.route('/createQueueDatabase', methods=['POST'])
@queueingCache.cached(timeout = 1)
def createQueueDatabase():
    queueID = request.args.get('queueID')
    
    # Empty the queue for this class
    queues = db.getSome("Queues", "Cornell_University", {'id': queueID})
    for queue in queues:
        db.delete("Queues", "Cornell_University", queue["_id"])
    
    outcome = db.post("Queues", "Cornell_University", {'id': queueID, 'queue': []})

    return str(outcome)

@queues.route('/getQueueDatabase', methods=['GET'])
def getQueueDatabase():
    queueID = request.args.get('queueID')

    result = db.getSome("Queues", "Cornell_University", {'id': queueID})

    # queue = queueingCache.get(f'queue-{queueID}')
    # queueEntries = queue.getQueue()

    # entries_str = ""
    # for entry in queueEntries:
    #     entries_str += entry.question + " "
    
    # entries_str += str(queue.numEntries)

    print(result)

    return {"data": result[0]}

@queues.route('/addQueueEntryDatabase', methods=['POST'])
def addQueueEntryDatabase():
    queueID = request.args.get('queueID')

    result = db.getSome("Queues", "Cornell_University", {'id': queueID})[0]
    result["queue"].append("Bill - 0 - Test?")

    outcome = db.patch("Queues", "Cornell_University", result["_id"], {'id': queueID, 'queue': result["queue"]})

    return str(outcome)

@queues.route('/removeQueueEntryDatabase', methods=['POST'])
def removeQueueEntryDatabase():
    queueID = request.args.get('queueID')
    entryID = request.args.get('entryID')

    result = db.getSome("Queues", "Cornell_University", {'id': queueID})[0]
    entryDBID = filter(lambda x: x['_id'] == entryID, result['queue'])
    
    outcome = db.delete("Queues", "Cornell_University", entryDBID)

    return str(outcome)