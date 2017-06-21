from django.http import JsonResponse
import math
import json

from ..models import Comment, Movie
from movies.utils import get_token_data

# @csrf_exempt # temporary decorator to remove csrf, just to test with postman
def comment(request):
    if request.method == 'POST':
        post_data = json.loads(request.body)
        movie_id = post_data['id']
        body = post_data['body']

        try:
            username = post_data['username']
        except KeyError:
            token = get_token_data(request)
            username = token['username']

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

    items_per_page = 7
    page = int(request.GET.get('p', 1))

    c = Comment.objects.filter(movie_id=movie_id).order_by('-date')
    total_pages = math.ceil(c.count() / items_per_page)

    page = page-1 if page <=total_pages or total_pages==0 else total_pages-1
    limits = {
        'from': items_per_page * page,
        'to': (items_per_page * page) + items_per_page
    }

    comments = c[limits['from']: limits['to']].values()

    return JsonResponse({
        'status': 'success',
        'data': {
            'comments': list(comments),
            'total_pages': total_pages,
            'current_page': page+1,
            'items_per_page': items_per_page
        }
    })

# not currently used
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