from django.core.exceptions import PermissionDenied
import jwt
from django.conf import settings

# since I am using the middleware on a per-view basis I need to define the process_request | process_response
# methods and not the __init__ | __call__ ones
# http://agiliq.com/blog/2015/07/understanding-django-middlewares/
# https://docs.djangoproject.com/en/1.11/ref/utils/#django.utils.decorators.decorator_from_middleware

class JwtAuthentication(object):
    def process_request(self, request):
        # print('middleware executed')
        if 'HTTP_AUTHORIZATION' in request.META:
            token = request.META['HTTP_AUTHORIZATION']
            try:
                payload = jwt.decode(token, settings.JWT_SECRET)
            except jwt.ExpiredSignatureError:
                # print('token exprired')
                raise PermissionDenied
            except:
                # print('token not valid')
                raise PermissionDenied
            # print('ok access GRANTED', payload)
            # print(payload['exp'])
            return None
        else:
            raise PermissionDenied



# "standard" middleware
# https://docs.djangoproject.com/en/1.11/topics/http/middleware/#writing-your-own-middleware
# and then add on the end of settings.py > MIDDLEWARE as movies.middlewares...
# middleware will be applied to each view

# other interesting link, middlewares with arguments or to decorate methods
# https://docs.djangoproject.com/en/1.11/ref/utils/#module-django.utils.decorators