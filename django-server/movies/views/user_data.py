from django.utils.decorators import decorator_from_middleware
from movies.middlewares.jwt_authentication import JwtAuthentication
from movies.utils import get_token_data, create_login_token
from django.contrib.auth.models import User
from django.http import JsonResponse
import json
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate

@decorator_from_middleware(JwtAuthentication)
def get_user_data(request):
    token = get_token_data(request)
    username = token['username']

    try:
        u = User.objects.get(username=username).values('username', 'email')
    except User.DoesNotExist:
        return JsonResponse({
            'status': 'fail',
            'data': {
                'message': 'The username does not exist'
            }
        }, status=500)

    return JsonResponse({
        'status': 'success',
        'data': u
    })

# @csrf_exempt
@decorator_from_middleware(JwtAuthentication)
def update_data(request):
    # only the email can be updated here
    token = get_token_data(request)
    username = token['username']

    post_data = json.loads(request.body)
    new_email = post_data['email']

    # get user object
    u = User.objects.get(username=username)
    u.email = new_email
    try:
        u.save()
    except:
        return JsonResponse({
            'status': 'fail',
            'data': {
                'message': 'There was an error while updating user data'
            }
        }, status=500)

    token = create_login_token({'username': u.username, 'email': u.email})
    res = JsonResponse({
        'status': 'success'
    })
    res.set_cookie('token', value=token['token'], expires=token['exp'])
    return res

@csrf_exempt
def update_password(request):
    token = get_token_data(request)
    username = token['username']

    post_data = json.loads(request.body)
    new_password = post_data['password']
    old_password = post_data['oldPassword']

    # check old password and get user object
    u = authenticate(username=username, password=old_password)
    if u is not None:
        u.set_password(new_password)
        try:
            u.save()
        except:
            return JsonResponse({
                'status': 'fail',
                'data': {
                    'message': 'There was an error while updating the password'
                }
            }, status=500)

        return JsonResponse({
            'status': 'success'
        })
    else:
        return JsonResponse({
            'status': 'fail'
        }, status=401)

@csrf_exempt
def delete_account(request):
    if request.method != 'DELETE':
        pass

    token = get_token_data(request)
    username = token['username']

    u = User.objects.get(username=username)
    try:
        u.delete()
    except:
        return JsonResponse({
            'status': 'fail',
            'data': {
                'message': 'There was an error while deleting user account'
            }
        }, status=500)

    # need to delete jwt cookie on client side
    return JsonResponse({
        'status': 'success'
    })