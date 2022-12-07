import requests

for num in range(500,1000):
    deleteRequest = {
        "name": f"test_{num}"
    }

    requests.delete('http://localhost:5000/', json = deleteRequest)
