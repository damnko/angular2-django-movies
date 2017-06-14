from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import Comment, Movie
import json

@csrf_exempt # temporary decorator to remove csrf, just to test with postman
def comment(request):
    if request.method == 'POST':
        # movie_id = request.POST.get('id', '')
        # username = request.POST.get('username', '')
        # body = request.POST.get('body', '')

        post_data = json.loads(request.body)
        movie_id = post_data['id']
        username = post_data['username']
        body = post_data['body']

        # get movie object
        m, created = Movie.objects.get_or_create(source_id = movie_id, defaults={'title': ''})
        # comment
        c = Comment(movie = m, username = username, body = body)
        try:
            c.save()
        except:
            return JsonResponse({
                'status': 'fail',
                'data': {
                    'message': 'Error while saving comment'
                }
            }, status=500)

        return JsonResponse({
            'status': 'success',
            'data': {
                'id': c.id
            }
        })
    elif request.method == 'DELETE':
        id = request.GET.get('id', '')
        username = request.GET.get('u', '')

        try:
            c = Comment.objects.get(id=id, username=username)
        except Comment.DoesNotExist:
            return JsonResponse({
                'status': 'fail',
                'data': {
                    'message': 'This comment does not exist'
                }
            }, status=500)

        try:
            c.delete()
        except:
            return JsonResponse({
                'status': 'fail',
                'data': {
                    'message': 'Error while deleting comment'
                }
            }, status=500)

        return JsonResponse({
            'status': 'success'
        })

def get_comments(request, movie_id):
    if request.method != 'GET':
        pass

    username = request.GET.get('u', '')

    c = Comment.objects.filter(movie_id=movie_id).values()
    return JsonResponse({
        'status': 'success',
        'data': {
            'comments': list(c)
        }
    })

@csrf_exempt # temporary decorator to remove csrf, just to test with postman
def update_comment(request, id):
    if request.method != 'POST':
        pass

    username = request.POST.get('username', '')
    body = request.POST.get('body', '')

    try:
        c = Comment.objects.get(id=id, username=username)
    except Comment.DoesNotExist:
        return JsonResponse({
            'status': 'fail',
            'data': {
                'message': 'This comment does not exist'
            }
        }, status=500)

    c.body = body
    try:
        c.save()
    except:
        return JsonResponse({
            'status': 'fail',
            'data': {
                'message': 'Error while updating comment'
            }
        })

    return JsonResponse({
        'status': 'success'
    })