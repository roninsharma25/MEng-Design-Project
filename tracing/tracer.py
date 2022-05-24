import time
import logging
import requests
from jaeger_client import Config
from opentracing_instrumentation.request_context import get_current_span, span_in_context

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

def get_posts():
    with tracer.start_span('GetPosts', child_of=get_current_span()) as span:
        with span_in_context(span):
            response = requests.get('http://localhost:5000/posts/all')
            span.log_kv({'event': 'GetPosts', 'response': response})

def get_users():
    with tracer.start_span('GetUsers', child_of=get_current_span()) as span:
        with span_in_context(span):
            response = requests.get('http://localhost:5000/users/all')
            span.log_kv({'event': 'GetPosts', 'response': response})


# TODO: ADD MORE ENDPOINTS


tracer = init_tracer('api')
get_posts()
get_users()
time.sleep(5)
tracer.close()

