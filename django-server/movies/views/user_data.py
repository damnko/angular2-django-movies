from django.utils.decorators import decorator_from_middleware
from movies.middlewares.jwt_authentication import JwtAuthentication

@decorator_from_middleware(JwtAuthentication)
def get_user_data(request):
    print('get user data')
    if 'HTTP_AUTHORIZATION' in request.META:
        print('presente')
    else:
        print('non presente')