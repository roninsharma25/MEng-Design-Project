import concurrent.futures
import requests
import time
import matplotlib.pyplot as plt

BACKEND_URLS = {
                    'posting': 'http://localhost:5000/',
                    'queueing': 'http://localhost:5001/',
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
    
    def general_request_endpoint(self, service, endpoint):
        request_url = BACKEND_URLS[service] + endpoint
        
        return request_url
    
    def create_requests(self, num_requests):
        urls = [self.general_request_endpoint(self.service, self.endpoint)] * num_requests
        self.start_timer()
        with concurrent.futures.ThreadPoolExecutor(max_workers=num_requests) as pool:
            responses = list(pool.map(self.get_request, urls))
        elapsed_time = self.get_time_elapsed()

        return elapsed_time
    
    def aggregate_request_results(self, num_requests, num_trials):
        self.x_data.append(num_requests)

        trial_data = []
        for i in range(num_trials):
            trial_data.append(self.create_requests(num_requests))
        
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
    for i in range(1, 100, 10):
        request_handler.aggregate_request_results(i, 5)
    request_handler.plot_data()


