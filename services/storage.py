# storage.py: Functions for accessing storage services
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 4 March 2022

import services.databases as db

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
    def __init__(self, name, id = 0):
        self.name = name
        self.id = id
    
    """
    Returns the user's ID.
    """
    def getId(self):
        return self.id

    """
    Returns the user's name.
    """
    def getName(self):
        return self.name

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
    def addEntry(self, user, question, classID):
        self.numEntries += 1
        entry = QueueEntry(user, question, self.numEntries, classID)
        self.queue.append(entry)
    
    """
    Removes an entry from the queue.
    """
    def removeEntry(self, entry):
        removedPlace = entry.place
        self.queue.remove(entry)

        for i in range(removedPlace, self.numEntries):
            self.queue[i].updatePlace(i)

        self.numEntries -= 1

    """
    Get all entries in the queue.
    """
    def getQueue(self):
        return self.queue
    
    """
    Get a subset of entries in the queue.
    """
    def getQueueSubset(self, startPos, endPos):
        return self.queue[startPos:endPos+1]
    
    """
    Add the current state of the queue to the database.
    """
    def updateDatabase(self, school = 'Cornell', key = 'Current State of the Queue'):
        db.post('Queues', school, {key: self.queue})

    """
    Get the current state of the queue from the database.
    """
    def getDatabaseQueue(self, school = 'Cornell', key = 'Current State of the Queue'):
        dbResult = db.getAll('Queues', school)
        for obj in dbResult:
            if key in obj:
                return obj[key]


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
    Returns the user for this queue entry.
    """
    def getUser(self):
        return self.user

    """
    Returns the user's place in the queue.
    """
    def getPlace(self):
        return self.place
    
    """
    Update's the user's place in the queue.
    """
    def updatePlace(self, newPlace):
        self.place = newPlace
