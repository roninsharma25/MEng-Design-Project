from database_utils import *

# Get all data from a table
data = getAll('Posts', 'Cornell_University')
#print(data)

# Get one piece of data from a table
data = getOne('Posts', 'Cornell_University', {'question': 'Test1234'})
#print(data)

# Add data to a table
#result = post('Posts', 'Cornell_University', {'question': 'FA22', 'email': 'test@gmail.com'})
#print(result)

# Update one piece of data in a table
result = patch('Posts', 'Cornell_University', {'question': 'who?', 'email': 'who@gmail.com'}, {'question': '???', 'email': 'test@gmail.com'})
print(result)