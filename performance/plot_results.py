import matplotlib.pyplot as plt

# RPS
x = [ i * 1000 for i in range(1,6) ]

# Latency
y = [ 11.446669816970825, 21.463001012802124, 32.41301703453064, 
      41.34387993812561, 51.120333194732666 ]

plt.plot(x, y)
plt.title('RPS vs Latency')
plt.xlabel('Requests per Second (RPS)')
plt.ylabel('Latency (seconds)')
plt.savefig('rps_latency.png')
