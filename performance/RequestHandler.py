import concurrent.futures
import requests
import time
import threading
import matplotlib.pyplot as plt

BACKEND_URLS = {
                    'posting': 'http://localhost:5000/',
                    'queueing': 'http://localhost:5001/',
               }

# Request types
    # 0: GET
    # 1: POST
REQUEST_TYPE = {
    'posting': {
        'all': 0,
        'some': 0,
        '': 1, # create new post
    },
    'queueing': {
        'all': 0
    }
}

class RequestHandler:
    def __init__(self, service, endpoint):
        self.service = service
        self.endpoint = endpoint
        self.x_data = []
        self.y_data = []
        self.time_durations = []
    
    def get_request(self, url):
        start_time = time.time()
        
        response = requests.get(url)

        time_duration = time.time() - start_time
        self.time_durations.append(time_duration)
        
        return response
    
    def post_request(self, url, json):
        response = requests.post(url, json = json)

        return response

    def general_request_endpoint(self, service, endpoint):
        request_url = BACKEND_URLS[service] + endpoint
        
        return request_url
    
    def create_requests(self, rps, num_requests, parameters, json):
        interval = 1/rps
        url = self.general_request_endpoint(self.service, self.endpoint) + parameters
        request_type = REQUEST_TYPE[self.service][self.endpoint]

        if (request_type == 0):
            self.threads = []
            for _ in range(num_requests):
                self.threads.append(threading.Thread(target = self.get_request, args = (url, )))

            for thread in self.threads:
                timer = threading.Timer(interval, thread.run)
                timer.start()
 
        time.sleep(10) # wait for the threads to finish
        average_time_duration = sum(self.time_durations) / len(self.time_durations)
        

        return average_time_duration

    def aggregate_request_results(self, rps, num_requests, num_trials, parameters = '', json = ''):
        self.x_data.append(rps)

        trial_data = []
        for i in range(num_trials):
            trial_data.append(self.create_requests(rps, num_requests, parameters, json))
        
        self.y_data.append(sum(trial_data) / num_trials)

    def start_timer(self):
        self.start_time = time.time()
    
    def get_time_elapsed(self):
        time_elapsed = time.time() - self.start_time

        return time_elapsed
    
    def plot_data(self):
        plt.plot(self.x_data, self.y_data)
        plt.title('RPS vs Latency')
        plt.xlabel('Requests per Second (RPS)')
        plt.ylabel('Latency (seconds)')
        plt.savefig(f'plots/{self.service}_{self.endpoint}.png')
    
    def clear_data(self):
        self.x_data = []
        self.y_data = []

    
if __name__ == '__main__':
    request_handler = RequestHandler('queueing', 'all')
    new_post = {
        'question': 'test',
        'questionBody': 'test',
        'email': 'test',
        'role': 'Student',
        'class': '1110',
        'name': 'test'
    }

    for rps in range(1, 2002, 100):
        request_handler.aggregate_request_results(rps, 10, 3)

    request_handler.plot_data()
