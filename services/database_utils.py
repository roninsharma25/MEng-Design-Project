import os

from pymongo import MongoClient

connectionString = f"mongodb+srv://sal:{os.getenv('DB_PW')}@letmeout-east.nbpq2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = MongoClient(connectionString)

# FUNCTIONS ********************************************************************

def getCollection(database, school):
    """
    Returns the collection of a school within a database.
    """
    assert database in ["Classes", "Posts", "Queues", "Users", "GlobalChat", "Grades"]

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


def getRecent(database, school, num_records):
    """
    Returns a list of objects in the corresponding collection denoted by the 
    database and school using the filter criteria in the provided json.
    """
    collection = getCollection(database, school)
    cursor = collection.find().sort("$natural", -1).limit(num_records)
    result = []
    for element in cursor:
        element["_id"] = str(element["_id"])
        result.append(element)
    return result


def getOne(database, school, searchJSON):
    """
    Returns a single object with the given attribute(s) in the corresponding 
    collection denoted by the database and school.
    """
    collection = getCollection(database, school)

    result = collection.find_one(searchJSON)
    result["_id"] = str(result["_id"])
    return result


def patch(database, school, searchJSON, json, updateMultiple = False):
    """
    Updates a single object to the corresponding collection denoted by the 
    database and school with the data given by the json dictionary. Returns True 
    iff the operation was successful.
    """
    try:
        collection = getCollection(database, school)
        
        if (updateMultiple):
            collection.update_many(searchJSON, json)
        else:
            collection.update_one(searchJSON, {"$set": json}, upsert = True)
        
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
        id = collection.insert_one(json)
        return True
    except:
        return False


def delete(database, school, searchJSON, deleteMultiple = False):
    """
    Removes a single object with the given attribute(s) from the corresponding 
    collection denoted by the database and school. Returns True iff the 
    operation was successful.
    """
    try:
        collection = getCollection(database, school)

        if deleteMultiple:
            collection.delete_many(searchJSON)
        else:
            collection.delete_one(searchJSON)

        return True
    except:
        return False
