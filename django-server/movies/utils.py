from datetime import datetime, timedelta
from django.conf import settings
import jwt


def create_login_token(data):
    expiration = datetime.utcnow() + timedelta(days=30)
    data['exp'] = expiration
    token = jwt.encode(data, settings.JWT_SECRET, algorithm='HS256')
    return {
        'token': token,
        'exp': expiration
    }

def get_token(request):
    token = request.META['HTTP_AUTHORIZATION']
    return token

def get_token_data(request):
    token = get_token(request)
    token = jwt.decode(token, settings.JWT_SECRET)
    return token