# database.py: Functions for accessing databases
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 14 February 2022

import os
from pymongo import MongoClient
from bson.objectid import ObjectId

connectionString = f"mongodb+srv://sal:{os.getenv('DB_PW')}@letmeout-east.nbpq2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = MongoClient(connectionString)

# FUNCTIONS ********************************************************************

def getCollection(database, school, schoolFlag = True, collection = ''):
    """
    Returns the collection of a school within a database.
    """
    assert database in ["Classes", "Posts", "Queues", "Users"]

    if schoolFlag:
        return client[database][school]
    else:
        return client[database][collection]


def getAll(database, school, schoolFlag = True, extraData = ''):
    """
    Returns a list of objects in the corresponding collection denoted by the 
    database and school.
    """
    collection = getCollection(database, school, schoolFlag, extraData)
    cursor = collection.find()
    result = []
    for element in cursor:
        element["_id"] = str(element["_id"])
        result.append(element)
        print(type(element))
    return result


def getSome(database, school, json):
    """
    Returns a list of objects in the corresponding collection denoted by the 
    database and school using the filter criteria in the provided json.
    """
    collection = getCollection(database, school)
    cursor = collection.find(json)
    result = []
    for element in cursor:
        element["_id"] = str(element["_id"])
        result.append(element)
    return result


def getOne(database, school, objectId, schoolFlag = True, extraData = ''):
    """
    Returns a single object with the given objectId in the corresponding 
    collection denoted by the database and school.
    """
    collection = getCollection(database, school, schoolFlag, extraData)

    result = collection.find_one({"_id": ObjectId(objectId)})
    result["_id"] = str(result["_id"])
    return result


def patch(database, school, objectId, json, schoolFlag = True, extraData = ''):
    """
    Updates a single object to the corresponding collection denoted by the 
    database and school with the data given by the json dictionary. Returns True 
    iff the operation was successful.
    """
    try:
        collection = getCollection(database, school, schoolFlag, extraData)
        print("AFTER 1")
        print(json)
        collection.update_one({"_id": ObjectId(objectId)}, {"$set": json})
        print("AFTER 2")
        return True
    except:
        return False


def post(database, school, json, schoolFlag = False):
    """
    Adds a single object to the corresponding collection denoted by the database
    and school with the data given by the json dictionary. Returns True iff the 
    operation was successful.
    """
    try:
        collection = getCollection(database, school, schoolFlag, json['class_'])
        id = collection.insert_one(json)
        return True, id
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
