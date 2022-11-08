import concurrent.futures
import requests
import time
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
    
    def get_request(self, url):
        response = requests.get(url)
        
        return response
    
    def post_request(self, url, json):
        response = requests.post(url, json = json)

        return response

    def general_request_endpoint(self, service, endpoint):
        request_url = BACKEND_URLS[service] + endpoint
        
        return request_url
    
    def create_requests(self, num_requests, parameters, json):
        urls = [self.general_request_endpoint(self.service, self.endpoint) + parameters] * num_requests
        self.start_timer()
        with concurrent.futures.ThreadPoolExecutor(max_workers=num_requests) as pool:
            request_type = REQUEST_TYPE[self.service][self.endpoint]
            if (request_type == 0):     
                responses = list(pool.map(self.get_request, urls))
            elif (request_type == 1):
                responses = list(pool.map(self.post_request, urls, [ json ] * num_requests))
        elapsed_time = self.get_time_elapsed()

        return elapsed_time
    
    def aggregate_request_results(self, num_requests, num_trials, parameters = '', json = ''):
        self.x_data.append(num_requests)

        trial_data = []
        for i in range(num_trials):
            trial_data.append(self.create_requests(num_requests, parameters, json))
        
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
    request_handler = RequestHandler('posting', '')
    new_post = {
        'question': 'test',
        'questionBody': 'test',
        'email': 'test',
        'role': 'Student',
        'class': '1110',
        'name': 'test'
    }
    for i in range(1, 100, 10):
        request_handler.aggregate_request_results(i, 5, parameters = '', json = new_post)
    request_handler.plot_data()


