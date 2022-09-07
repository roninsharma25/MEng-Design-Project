from flask import *
from constants import *
import requests

app = Flask(__name__, static_url_path = '')

@app.route('/')
def example():
    return {'message': 'Hello World'}

@app.route('/test')
def testGet():
    return 'Posting!'

@app.route('/queueing')
def testQueuing():
    response = requests.get(f'http://127.0.0.1:{queueingPort}/test')
    
    return response.text

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=postingPort)