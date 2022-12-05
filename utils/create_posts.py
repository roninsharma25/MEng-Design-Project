import requests

for num in range(5001, 8000):
    postRequest = {
        "question": "test question",
        "questionBody": "",
        "email": "",
        "role": "Student",
        "class": "",
        "name": f"test_{num}"
    }

    requests.post('http://localhost:5000/', json = postRequest)
