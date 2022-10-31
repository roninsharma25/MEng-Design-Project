from queue import Queue
from threading import Thread
import matplotlib.pyplot as plt
import requests
import time


frontend_url = 'http://localhost:3000'
backend_url = 'http://localhost:5000'

def basic_get(url):
    url_split = url.split('/')
    index = url_split[-1]
    endpoint = '/'.join(url_split[:-1])
    result = session.get(endpoint)

    results[index] = result

# Worker class that serves individual threads
class Worker(Thread):
    def __init__(self, tasks):
        super().__init__()
        self.tasks = tasks
        self.daemon = True
        self.start()
    
    def run(self):
        while True:
            func, args, kargs = self.tasks.get()
            try:
                func(*args, **kargs)
            except Exception as e:
                print(e)
            finally:
                self.tasks.task_done()

# ThreadPool class that has the threads executing tasks from a queue
class ThreadPool():
    def __init__(self, num_threads):
        self.tasks = Queue(num_threads)
        for i in range(num_threads):
            Worker(self.tasks)
    
    def add_task(self, func, *args, **kargs):
        self.tasks.put((func, args, kargs))
    
    def map(self, func, args_list):
        for args in args_list:
            self.add_task(func, args)
    
    def wait_completion(self):
        self.tasks.join()


if __name__ == '__main__':
    # RPS
    x = []

    # Latency
    y = []

    for i in range(1000, 20001, 1000):
        urls = [f'{frontend_url}/{j}' for j in range(i)]
        pool = ThreadPool(40)
        results = {}
        session = requests.session()

        start_time = time.time()
        pool.map(basic_get, urls)
        pool.wait_completion()
        total_time = time.time() - start_time

        x.append(i)
        y.append(total_time)

        print(i, total_time)

    # Plot Results
    plt.plot(x, y)
    plt.title('RPS vs Latency')
    plt.xlabel('Requests per Second (RPS)')
    plt.ylabel('Latency (seconds)')
    plt.savefig('rps_latency.png')
