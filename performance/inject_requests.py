import concurrent.futures
import requests
import time
import matplotlib.pyplot as plt

def func(url):
    resp = requests.get(url)
    return resp

x = []
y = []

for i in range(1, 1001, 100):
    x.append(i)
    urls = ['http://localhost:5000/all'] * i
    start_time = time.time()
    with concurrent.futures.ThreadPoolExecutor(max_workers=i) as pool:
        responses = list(pool.map(func, urls))
        
    elapsed_time = time.time() - start_time
    y.append(elapsed_time)

    print(i, elapsed_time)


# Plot Results
plt.plot(x, y)
plt.title('RPS vs Latency')
plt.xlabel('Requests per Second (RPS)')
plt.ylabel('Latency (seconds)')
plt.savefig('rps_latency.png')
