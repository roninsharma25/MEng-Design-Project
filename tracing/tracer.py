import time
import logging
import requests
from jaeger_client import Config
from opentracing_instrumentation.request_context import get_current_span, span_in_context

stem = 'http://localhost:5000'

def init_tracer(service):
    logging.getLogger('').handlers = []
    logging.basicConfig(format='%(message)s', level=logging.DEBUG)    
    config = Config(
        config={
            'sampler': {
                'type': 'const',
                'param': 1,
            },
            'logging': True,
        },
        service_name=service,
    )
    return config.initialize_tracer()

# Posting
def get_posts():
    with tracer.start_span('GetPosts', child_of=get_current_span()) as span:
        with span_in_context(span):
            response = requests.get(f'{stem}/posts/all')
            span.log_kv({'event': 'GetPosts', 'response': response})

def create_post():
    with tracer.start_span('CreatePost', child_of=get_current_span()) as span:
        with span_in_context(span):
            email = 'sal123@gmail.com'
            class_ = 'JAM_1110'
            question = 'Test question?'
            response = requests.post(f'{stem}/posts/', data = {'email': email, 'class_': class_, 'question': question})
            span.log_kv({'event': 'CreatePost', 'response': response})

# Users
def get_users():
    with tracer.start_span('GetUsers', child_of=get_current_span()) as span:
        with span_in_context(span):
            response = requests.get(f'{stem}/users/all')
            span.log_kv({'event': 'GetUsers', 'response': response})

def get_one_user():
    with tracer.start_span('GetOneUser', child_of=get_current_span()) as span:
        with span_in_context(span):
            response = requests.get(f'{stem}/users/one?email=sal123@gmail.com&class=JAM_1110')
            span.log_kv({'event': 'GetOneUser', 'response': response})

def create_user():
    with tracer.start_span('CreateUser', child_of=get_current_span()) as span:
        with span_in_context(span):
            name = 'Test User'
            email = 'test_user@gmail.com'
            role = 'Student'
            class_ = 'JAM_1110'

            response = requests.post(f'{stem}/users/', data = {'Name': name, 'Email': email, 'Type': role, 'class_': class_})
            span.log_kv({'event': 'CreateUser', 'response': response})

# Queueing
def get_queues():
    with tracer.start_span('GetQueues', child_of=get_current_span()) as span:
        with span_in_context(span):
            response = requests.get(f'{stem}/queues/all')
            span.log_kv({'event': 'GetQueues', 'response': response})



# TODO: ADD MORE ENDPOINTS

tracer = init_tracer('api')
get_posts()
create_post()

get_users()
get_one_user()
create_user()

get_queues()

time.sleep(5)
tracer.close()

