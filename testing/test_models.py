from services.storage import *

def testUser():
    user = User(name = 'billy', email = 'billy123@gmail.com', role = 'TA')
    assert user.getName() == 'billy'
    assert user.getEmail() == 'billy123@gmail.com'
    assert user.getRole() == 'TA'

def testModels():
    testUser()