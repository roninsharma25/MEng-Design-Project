from pymongo import MongoClient

connectionString = "mongodb+srv://sal:sal2413@letmeout-east.nbpq2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = MongoClient(connectionString)

db = client.test

testData = {"1": 2, "2": 3, "3": 4}

result = db.test2.insert_one(testData)