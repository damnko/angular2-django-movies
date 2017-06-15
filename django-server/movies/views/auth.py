from django.views.decorators.csrf import csrf_exempt
from django.http import JsonResponse
import json
from django.contrib.auth.models import User
from django.contrib.auth import authenticate
from movies.utils import create_login_token

@csrf_exempt
def username_exists(request):
    post_data = json.loads(request.body)
    username = post_data['username']

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

@csrf_exempt
def register(request):
    if request.method != 'POST':
        pass

    post_data = json.loads(request.body)
    username = post_data['username']
    password = post_data['password']

    # register user
    try:
        u = User.objects.create_user(username=username, password=password)
        u.save()
    except:
        return JsonResponse({
            'status': 'fail',
            'data': {
                'message': 'There was an error during registration'
            }
        }, status=500)

    # login user
    return login(request, True, {'username': username})

@csrf_exempt
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
            token = create_login_token({'username': username})
        else:
            return JsonResponse({
                'status': 'fail'
            }, status=401)

    res = JsonResponse({
        'status': 'success'
    })
    res.set_cookie('token', value=token['token'], expires=token['exp'])
    return res
