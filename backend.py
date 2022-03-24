from flask import *
from flask_opentracing import FlaskTracer
from jaeger_client import Config
from services import memcached
from flask_caching import Cache
from services.queues import queues
from services.posts import posts
from services.users import users
from services.classes import classes
from services.schools import schools
from services.caches import queueingCache

app = Flask(__name__, static_url_path = '') # for deployment: , static_folder = 'frontend/build')

# Setup Cache

queueingCache.init_app(app, {"CACHE_TYPE": "memcached"})
# cache = Cache(app)

app.register_blueprint(queues)
app.register_blueprint(posts)
app.register_blueprint(users)
app.register_blueprint(classes)
app.register_blueprint(schools)

@app.route('/')
def example():
    return {'message': 'Hello World'}

@app.route('/testGet')
def testGet():
    return 'test'

# @app.route('/test/memcached')
# @cache.cached()
# def getData():
#     return {'output': memcached.basicGet(cache)}

# def initialize_tracer():
#     config = Config(
#         config = {
#             'sampler': {'type': 'const', 'param': 1}
#         },
#         service_name = 'queueing')
#     return config.initialize_tracer()

# flaskTracer = FlaskTracer(initialize_tracer, True, app)

if __name__ == '__main__':
    app.run(host='localhost', port='5000', debug=True)
