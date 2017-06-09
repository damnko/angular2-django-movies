from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from ..models import Rating, Movie

@csrf_exempt # temporary decorator to remove csrf, just to test with postman
def rate(request):

    # if POST, save or update rating
    if request.method == 'POST':
        movie_id = request.POST.get('id', '')
        rating = request.POST.get('rating','')
        username = request.POST.get('username','')

        # get the movie object with id movie_id
        m = Movie.objects.get(source_id=movie_id)
        # save or update rating
        try:
            r, created = Rating.objects.update_or_create(username=username, movie=m, defaults={'rating': rating})
        except Exception as e:
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