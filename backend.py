from flask import *
from flask_opentracing import FlaskTracer
from jaeger_client import Config

app = Flask(__name__, static_url_path = '') # for deployment: , static_folder = 'frontend/build')

@app.route("/")
def default():
    return "test"

@app.route('/test') # /test?arg=val
def getScore():
    arg = request.args.get('arg')
    return {'output': f'The argument is {arg}'}

def initialize_tracer():
    config = Config(
        config = {
            'sampler': {'type': 'const', 'param': 1}
        },
        service_name = 'queueing')
    return config.initialize_tracer()

flaskTracer = FlaskTracer(initialize_tracer, True, app)

if __name__ == '__main__':
    app.run(host='localhost', port='5000')
