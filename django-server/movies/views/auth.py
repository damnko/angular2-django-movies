from django.http import JsonResponse
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from django.middleware.csrf import get_token
from django.core.exceptions import ValidationError
import json

from movies.utils import create_login_token
from movies.validators import validate_password, validate_email

def send_csrf(request):
    # just by doing this it will send csrf token back as Set-Cookie header
    csrf_token = get_token(request)
    return JsonResponse({
        'status': 'success',
        'data': csrf_token
    })

def username_exists(request):
    username = request.GET.get('u', '')

    try:
        u = User.objects.get(username=username)
    except User.DoesNotExist:
        return JsonResponse({
            'status': 'success',
            'data': {
                'username_exists': False
            }
        })
    return JsonResponse({
        'status': 'success',
        'data': {
            'username_exists': True
        }
    })

def register(request):
    if request.method != 'POST':
        pass

    post_data = json.loads(request.body)
    username = post_data['username']
    email = post_data['email']
    password = post_data['password']

    try:
        validate_password(password)
        validate_email(email)
    except ValidationError as e:
        return JsonResponse({
            'status': 'fail',
            'data': {
                'message': str(e)
            }
        }, status=500)

    # register user
    try:
        u = User.objects.create_user(username=username, password=password, email=email)
        u.save()
    except:
        return JsonResponse({
            'status': 'fail',
            'data': {
                'message': 'There was an error during registration'
            }
        }, status=500)

    # login user
    return login(request, True, {'username': username, 'email': email})

def login(request, redirect_after_registration=False, registration_data=None):
    if redirect_after_registration:
        token = create_login_token(registration_data)
    else:
        # check credentials
        post_data = json.loads(request.body)
        username = post_data['username']
        password = post_data['password']

        u = authenticate(username=username, password=password)
        # if authenticated, create and return token
        if u is not None:
            token = create_login_token({'username': u.username, 'email': u.email})
        else:
            return JsonResponse({
                'status': 'fail'
            }, status=401)

    print('token is', token['token'])

    res = JsonResponse({
        'status': 'success',
        'data': str(token['token'], 'utf-8')
    })
    res.set_cookie('token', value=token['token'], expires=token['exp'])
    return res
