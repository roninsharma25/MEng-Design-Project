from flask import *

app = Flask(__name__, static_url_path = '') # for deployment: , static_folder = 'frontend/build')

@app.route("/")
def default():
    return "test"

@app.route('/test') # /test?arg=val
def getScore():
    arg = request.args.get('arg')
    return {'output': f'The argument is {arg}'}

if __name__ == '__main__':
    app.run(host='localhost', port='5000')
