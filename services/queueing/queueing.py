from flask import *
import requests

queueingPort = 5001

app = Flask(__name__, static_url_path = '')

@app.route('/')
def example():
    return {'message': 'Hello World'}

@app.route('/test')
def testGet():
    return 'Queueing!'

@app.route('/posting')
def testQueuing():
    response = requests.get('http://127.0.0.1:5000/test')
    
    return response.text

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=queueingPort)