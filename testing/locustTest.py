from locust import HttpUser, task

class BasicUser(HttpUser):

    @task
    def test(self):
        self.client.get('/testGet')