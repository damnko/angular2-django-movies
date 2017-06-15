from datetime import datetime, timedelta
import jwt
from django.conf import settings

def create_login_token(data):
    expiration = datetime.utcnow() + timedelta(seconds=60)
    data['exp'] = expiration
    token = jwt.encode(data, settings.JWT_SECRET, algorithm='HS256')
    return {
        'token': token,
        'exp': expiration
    }