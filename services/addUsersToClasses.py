import os, databases, classes, users
from pymongo import MongoClient

connectionString = f"mongodb+srv://sal:{os.getenv('DB_PW')}@letmeout-east.nbpq2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = MongoClient(connectionString)

db = client['Classes']

classData = {
                'JAM_1110': ['sal123@gmail.com', 'bill123@gmail.com']
}

# Get the user object (from the User collection) for all users
users = {}

for key in classData:

    userObjs = []

    for email in classData[key]:
        userObjs.append(users.getOneByEmail(email))
    
    users[key] = userObjs

for className in classData:
    classResult = classes.getOne({'Class Name': className})

    for user in users[className]:
        classes.addUserToClass(user, className)

# For each user, update their classes attribute (list) and add this class to it

