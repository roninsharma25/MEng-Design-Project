from locust import HttpUser, task

class BasicUser(HttpUser):

    @task
    def testQueueing(self):
        self.client.get('/queues/all')

        # TEST CREATE QUEUE DATABASE

        # TEST ADD QUEUE ENTRY DATABASE
    
    @task
    def testPosting(self):
        self.client.get('/posts/all')

        # TEST CREATE POST
        email = 'sal123@gmail.com'
        class_ = 'JAM_1110'
        question = 'Test question?'
        self.client.post('/posts/', json={'email': email, 'class_': class_, 'question': question})

        # TEST ADDING AN ANSWER TO A POST
        id = '6274b08e0bc3e25e22921b3b'
        class_ = 'JAM_1110'
        email = 'sal123@gmail.com'
        answer = 'Yes'
        self.client.patch('/posts/addAnswerToPost', json={'_id': id, 'class': class_, 'email': email, 'answer': answer})
    
    @task
    def testUsers(self):
        self.client.get('/users/all')
        self.client.get(f'/users/one?email=sal123@gmail.com&class=JAM_1110')

        # TEST CREATING A USER
        name = 'Test User'
        email = 'test_user@gmail.com'
        role = 'Student'
        class_ = 'JAM_1110'
        self.client.post('/users/', json={'Name': name, 'Email': email, 'Type': role, 'class_': class_})
