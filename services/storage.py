# storage.py: Functions for accessing storage services
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 4 March 2022

import services.databases as db
import numpy as np
import time

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
    def __init__(self, name, question):
        self.user = User(name)
        self.question = question
        self.answers = []
    
    """
    Add an answer to the post.
    """
    def addAnswer(self, answer, user):
        self.answers.append([ user, answer ])
    
    """
    Returns the author of the post.
    """
    def getAuthor(self):
        return self.user
    
    """
    Returns all the answers for the post.
    """
    def getAnswers(self):
        return self.answers

class User:
    """
    A class to represent a user.
    """
    def __init__(self, name, email):
        self.name = name
        self.email = email
    
    """
    Returns the user's email.
    """
    def getEmail(self):
        return self.email

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
        self.responseTimes = []
        self.avgRespTime = 0
        self.numPeopleHelped = 0
    
    """
    Adds a new entry to the queue.
    """
    def addEntry(self, user, question, classID):
        self.numEntries += 1
        entry = QueueEntry(user, question, self.numEntries, classID)
        self.queue.append(entry)
    
    """
    Removes an entry from the queue.

    success: boolean representing if staff removed the student from the queue
                (false if the student left the queue)
    """
    def removeEntry(self, entry, staff = True):
        if staff:
            self.numPeopleHelped += 1

            respTime = entry.getTime()
            self.responseTimes.append(respTime)
            self.avgRespTime = np.average(self.responseTimes)
        
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
        db.post('Queues', school, {key: {'Queue': self.queue, 
                                         'Avg Resp Time': self.avgRespTime, 
                                         'Num People Helped': self.numPeopleHelped}})

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
        self.startTime = time.time()

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
    Returns the time (in minutes) spent in the queue.
    """
    def getTime(self):
        return int((time.time() - self.startTime) / 60)
    
    """
    Update's the user's place in the queue.
    """
    def updatePlace(self, newPlace):
        self.place = newPlace
