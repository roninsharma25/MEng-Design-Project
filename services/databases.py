# database.py: Functions for accessing databases
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('mongodb://localhost:4000/')

# MODELS ***********************************************************************

class Class:
    """
    A class to represent a class.
    """
    def __init__(self):
        pass


class Post:
    """
    A class to represent a post.
    """
    def __init__(self):
        pass
class User:
    """
    A class to represent a user.
    """
    def __init__(self, id = 0):
        self.id = id
    
    """
    Returns the user's ID.
    """
    def getId(self):
        return self.id

class Queue:
    """
    A class to represent a queue.
    """
    def __init__(self, classID = 0):
        self.classID = classID
        self.queue = []
        self.numEntries = 0
    
    """
    Adds a new entry to the queue.
    """
    def addEntry(self, entry):
        self.queue.append(entry)
        self.numEntries += 1
    
    """
    Removes an entry from the queue.
    """
    def removeEntry(self, entry):
        self.queue.remove(entry)
        self.numEntries -= 1
    
    """
    Get all entries in the queue.
    """
    def getQueue(self):
        return self.queue
class QueueEntry:
    """
    A class to represent a queue entry.
    """
    def __init__(self, user = User(0), question = "", place = 0, classID = 0):
        self.user = user
        self.question = question
        self.place = place
        self.classID = classID

    """
    Returns the user for this queue entry
    """
    def getUser(self):
        return self.user

    """
    Returns the user's place in the queue
    """
    def getPlace(self):
        return self.place

# FUNCTIONS ********************************************************************

def getCollection(database, school):
    """
    Returns the collection of a school within a database.
    """
    assert database in ["Classes", "Posts", "Queues", "Users"]
    return client[database][school]


def getAll(database, school):
    """
    Returns a list of objects in the corresponding collection denoted by the 
    database and school.
    """
    collection = getCollection(database, school)
    cursor = collection.find()
    result = []
    for element in cursor:
        element["_id"] = str(element["_id"])
        result.append(element)
    return result


def getOne(database, school, objectId):
    """
    Returns a single object with the given objectId in the corresponding 
    collection denoted by the database and school.
    """
    collection = getCollection(database, school)
    result = collection.find_one({"_id": ObjectId(objectId)})
    result["_id"] = str(result["_id"])
    return result


def patch(database, school, objectId, json):
    """
    Updates a single object to the corresponding collection denoted by the 
    database and school with the data given by the json dictionary. Returns True 
    iff the operation was successful.
    """
    try:
        collection = getCollection(database, school)
        collection.update_one({"_id": ObjectId(objectId)}, {"$set": json})
        return True
    except:
        return False


def post(database, school, json):
    """
    Adds a single object to the corresponding collection denoted by the database
    and school with the data given by the json dictionary. Returns True iff the 
    operation was successful.
    """
    try:
        collection = getCollection(database, school)
        collection.insert_one(json)
        return True
    except:
        return False


def delete(database, school, objectId):
    """
    Removes a single object with the given objectId from the corresponding 
    collection denoted by the database and school. Returns True iff the 
    operation was successful.
    """
    try:
        print(objectId)
        collection = getCollection(database, school)
        collection.delete_one({"_id": ObjectId(objectId)})
        return True
    except:
        return False
