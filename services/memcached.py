
def basicGet(cache):
    cache.set('key_1', 'value_1')
    x = cache.get('key_1')
    return x
