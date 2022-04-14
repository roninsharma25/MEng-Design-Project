from locust import HttpUser, task

class BasicUser(HttpUser):

    @task
    def test(self):
        self.client.get('/queues/getQueueDatabase?queueID=0')
        self.client.get('/users/all')
        self.client.get(f'/users/one?email=sal123@gmail.com')

        self.client.get('/queues/getQueue?queueID=0')