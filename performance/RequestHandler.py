import concurrent.futures
import requests
import time
import threading
import matplotlib.pyplot as plt
import numpy as np

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
        'one': 0,
        '': 1, # create new post
    },
    'queueing': {
        'all': 0
    }
}

RPS_DICT = {}

class RequestHandler:
    def __init__(self, service, endpoint, next_post):
        self.service = service
        self.endpoint = endpoint
        self.next_post = next_post
        self.x_data = []
        self.y_data = []
    
    def get_request(self, url, post_num, rps):
        start_time = time.time()
        
        response = requests.get(f'{url}?criteria=name&value=test_{post_num}')

        time_duration = time.time() - start_time

        if (rps not in RPS_DICT):
            RPS_DICT[rps] = [time_duration]
        else:
            RPS_DICT[rps].append(time_duration)
        
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
                self.threads.append(threading.Thread(target = self.get_request, args = (url, self.next_post, rps)))
                self.next_post += 1

            for iteration, thread in enumerate(self.threads):
                timer = threading.Timer(interval * iteration, thread.start)
                timer.start()
        
        # Wait a bit for the threads to start
        time.sleep(15)
    
        # Wait for the threads to finish
        for thread in self.threads:
            thread.join()

        # Calcualte the tail latency
        #latency_99_percentile = np.percentile(self.time_durations, 99)

        # Reset the time durations
        #self.time_durations = []

        #print(rps, latency_99_percentile)

        #return latency_99_percentile

    def aggregate_request_results(self, rps, num_requests, parameters = '', json = ''):
        #result = self.create_requests(rps, num_requests, parameters, json)
        self.create_requests(rps, num_requests, parameters, json)

        #self.x_data.append(rps)
        #self.y_data.append(result)

    def start_timer(self):
        self.start_time = time.time()
    
    def get_time_elapsed(self):
        time_elapsed = time.time() - self.start_time

        return time_elapsed
    
    def plot_data(self):
        # Format data for plotting
        for rps in RPS_DICT.keys():
            self.x_data.append(rps)
            self.y_data.append(np.percentile(RPS_DICT[rps], 99))
        
        plt.plot(self.x_data, self.y_data)
        plt.title('RPS vs Latency')
        plt.xlabel('Requests per Second (RPS)')
        plt.ylabel('Latency (seconds)')
        plt.savefig(f'plots/{self.service}_{self.endpoint}.png')

        print('x-data:', self.x_data)
        print('y-data:', self.y_data)
    
    def clear_data(self):
        self.x_data = []
        self.y_data = []

    
if __name__ == '__main__':
    request_handler = RequestHandler('posting', 'one', 5940) # NEED TO CREATE MORE POSTS

    for rps in range(1000, 5002, 200):
        print(rps)
        request_handler.aggregate_request_results(rps, 10)

    request_handler.plot_data()

    print(f'Next post: {request_handler.next_post}')
