# storage.py: Functions for accessing storage services
# 
# Authors: Ronin Sharma and Jude Javillo
# Version: 4 March 2022

import services.databases as db
import numpy as np
import time

from pydantic import BaseModel, Field
from typing import Optional
from bson.objectid import ObjectId
from fastapi.encoders import jsonable_encoder

# MODELS ***********************************************************************

class PydanticObjectId(ObjectId):
    """
    ObjectId field. Compatible with Pydantic.
    """

    @classmethod
    def __get_validators__(cls):
        yield cls.validate

    @classmethod
    def validate(cls, v):
        return PydanticObjectId(v)

    @classmethod
    def __modify_schema__(cls, field_schema: dict):
        field_schema.update(
            type="string",
            examples=["5eb7cf5a86d9755df3a6c593", "5eb7cfb05e32e07750a1756a"],
        )

class Class:
    """
    A class to represent a class.
    """
    def __init__(self):
        pass

class User(BaseModel):
    id: Optional[PydanticObjectId] = Field(None, alias="_id")
    name: str
    email: str
    role: str

    """
    A class to represent a user.
    """
    # def __init__(self, name, email = 'test@gmail.com'):
    #     self.name = name
    #     self.email = email
    
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
    
    """
    Returns the user's role.
    """
    def getRole(self):
        return self.role

    def to_json(self):
        return jsonable_encoder(self, exclude_none = True)
    
    def to_bson(self):
        data = self.dict(by_alias = True, exclude_none = True)
        print('DATA')
        print(data)
        # if data['_id'] is None:
        #     data.pop('_id')
        return data


class Post(BaseModel):
    id: Optional[PydanticObjectId] = Field(None, alias="_id")
    question: str
    email: str
    answers: list
    timeAdded: float
    author: User
    studentAnswers: list
    instructorAnswers: list
    studentFollowups: list
    instructorFollowups: list

    """
    A class to represent a post.
    """
    # def __init__(self, question, timeAdded):
    #     self.question = question
    #     self.answers = []
    #     self.timeAdded = timeAdded
    #     self.author = None
    
    """
    Add an answer to the post.
    """
    def addAnswer(self, answer, user):
        self.answers.append([ user, answer ])
    
    """
    Returns the author of the post.
    """
    def getAuthor(self):
        return self.author

    """
    Sets the author of the post.
    """
    def setAuthor(self, author):
        self.author = author
    
    """
    Returns all the answers for the post.
    """
    def getAnswers(self, type_):
        if (type_ == 'student'):
            return self.studentAnswers
        
        return self.instructorAnswers
    
    """
    Returns all the followups for the post.
    """
    def getFollowups(self, type_):
        if (type_ == 'student'):
            return self.studentFollowups
        
        return self.instructorFollowups

    """
    Add a followup to a post.

        author: the author of the follow-up (User)
        text: the content of the follow-up (str)
    """
    def addFollowup(self, author, text):
        data = { 'author': author.to_bson(), 'content': text }
        if (author.getRole() == 'student'):
            self.studentFollowups.append(data)
        else:
            self.instructorFollowups.append(data)
    
    """
    Add an answer to a post.

        author: the author of the answer (User)
        text: the content of the answer (str)
    """
    def addAnswer(self, author, text):
        data = { 'author': author.to_bson(), 'content': text }
        if (author.getRole() == 'student'):
            self.studentAnswers.append(data)
        else:
            self.instructorAnswers.append(data)
    
    def to_json(self):
        return jsonable_encoder(self, exclude_none = True)
    
    def to_bson(self):
        return self.dict(by_alias = True, exclude_none = True)

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
    def __init__(self, user = None, question = "", place = 0, classID = 0):
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
