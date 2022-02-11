from flask import *
from flask_opentracing import FlaskTracer
from jaeger_client import Config
import pymongo
#from services/posting import posting
from flask_caching import Cache
from services import memcached


app = Flask(__name__, static_url_path = '') # for deployment: , static_folder = 'frontend/build')
config = {
    "CACHE_TYPE": "MemcachedCache",
}
app.config.from_mapping(config)
cache = Cache(app)

# client = pymongo.MongoClient('mongodb+srv://jijavillo:billymode2021@cluster0.d5aze.mongodb.net/myFirstDatabase?retryWrites=true&w=majority')
# db = client.get_database('helpmeout')

@app.route('/')
def default():
    return 'test'

@app.route('/test') # /test?arg=val
def getScore():
    arg = request.args.get('arg')
    return {'output': f'The argument is {arg}'}

@app.route('/test/memcached')
@cache.cached()
def getData():
    return {'output': memcached.basicGet(cache)}

# @app.route('/queue')
# def testQueue():
#     collection = db['queue']
#     collection.insert_one({'student': 'billy'})
#     return {'result': 'Question successfully added to the queue'}

# @app.route('/posts')
# def testPosts():
#     collection = db['posts']
#     collection.insert_one({'student': 'billy'})
#     return {'result': 'Post successfully added to the discussion board'}

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
