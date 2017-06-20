from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import Rating, Movie
import json
from movies.utils import get_token_data

# @csrf_exempt # temporary decorator to remove csrf, just to test with postman
def rate(request):

    # if POST, save or update rating
    if request.method == 'POST':
        body = json.loads(request.body)
        movie_id = body['id']
        # rating = request.POST.get('rating', 0)
        rating = int(body['rating'])
        try:
            username = body['username']
        except KeyError:
            token = get_token_data(request)
            username = token['username']

        # get the movie object with id movie_id, or create it
        m, created = Movie.objects.get_or_create(source_id=movie_id, defaults={'title': ''})
        # save or update rating
        try:
            r, created = Rating.objects.update_or_create(username=username, movie=m, defaults={'rating': rating})
        except Exception as e:
            print(e)
            return JsonResponse({
                'status': 'fail',
                'data': {
                    'message': 'Error while saving rating'
                }
            }, status=500)

        return JsonResponse({
            'status': 'success',
            'data': {
                'title': m.title,
                'rating': r.rating,
                'is_new': created
            }
        })
    elif request.method == 'DELETE':
        username = request.GET.get('u', '')
        movie_id = request.GET.get('m_id', '')

        # find movie object
        m = Movie.objects.filter(source_id=movie_id).first()
        r = Rating.objects.filter(movie=m, username=username)

        # delete rating
        try:
            r.delete()
        except:
            return JsonResponse({
                'status': 'fail',
                'data': {
                    'message': 'Error while deleting rating'
                }
            }, status=500)

        return JsonResponse({
            'status': 'success'
        })

def getRating(request, movie_id):
    if request.method != 'POST':
        pass

    body = json.loads(request.body)
    username = body['username']

    # get rating
    r = Rating.objects.filter(movie_id = movie_id, username = username).first()

    return JsonResponse({
        'result': 'success',
        'data': {
            'rating': r.rating if r else None
        }
    })