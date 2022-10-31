import matplotlib.pyplot as plt

# RPS
x = [ i * 1000 for i in range(1,11) ]

# Latency
y = [ 2.158446788787842, 4.6104209423065186, 6.605509996414185, 
      8.915043115615845, 12.3398118019104, 14.473229885101318, 16.281068086624146,
      18.49314594268799, 21.10184383392334, 22.744621992111206]

plt.plot(x, y)
plt.title('RPS vs Latency')
plt.xlabel('Requests per Second (RPS)')
plt.ylabel('Latency (seconds)')
plt.savefig('rps_latency.png')
