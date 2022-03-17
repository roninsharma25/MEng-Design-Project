import databases
from pymongo import MongoClient

connectionString = "mongodb+srv://sal:<>@letmeout-east.nbpq2.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
client = MongoClient(connectionString)

db = client['Users']

# First get all users
students = databases.getAll('Users', 'Cornell_University')

# Get all emails
emails = []
for val in students:
    emails.append(val['Email'])

userData = [{'Name': 'Sal', 'Email': 'sal123@gmail.com', 'Type': 'Student'},
            {'Name': 'Bill', 'Email': 'bill123@gmail.com', 'Type': 'TA'},
            {'Name': 'Billiam', 'Email': 'billiam123@gmail.com', 'Type': 'TA'}]

for user in userData:
    if (user['Email'] not in emails):
        res = databases.post('Users', 'Cornell_University', user)
