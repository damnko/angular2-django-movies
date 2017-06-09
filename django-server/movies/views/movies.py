from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.db.models import Avg, Count

from ..models import Movie, Rating, Comment


@csrf_exempt # temporary decorator to remove csrf, just to test with postman
def new_movie(request):
    if request.method != 'POST':
        pass

    # get movie id and title
    id = request.POST.get('id', '')
    title = request.POST.get('title', '')

    # save new movie
    m = Movie(source_id = id, title = title)
    try:
        m.save()
    except Exception as e:
        return JsonResponse({
            'status': 'fail',
            'data': {
                'message': str(e) if type(e) == ValueError else 'Error while saving movie'
            }
        }, status=500)

    return JsonResponse({
        'status': 'success',
        'data': {
            'title': m.title
        }
    })


def movie_details(request, movie_id):
    print('movie ID is %s' % movie_id)
    if request.method != 'GET':
        pass

    # get movie
    try:
        m = Movie.objects.get(source_id=movie_id)
    except Movie.DoesNotExist:
        return JsonResponse({
            'status': 'fail',
            'data': {
                'message': 'The movie with ID %s does not exist' % movie_id
            }
        }, status=404)

    # get rating
    r = Rating.objects.filter(movie=m)\
        .values('rating')\
        .aggregate(
            avg_rating=Avg('rating'),
            rating_count=Count('rating')
        )
    avg_rating = r['avg_rating']
    rating_count = r['rating_count']

    # get comments
    c = Comment.objects.filter(movie=m).values('body', 'username')

    return JsonResponse({
        'status': 'success',
        'data': {
            'rating': {
                'avg': avg_rating,
                'count': rating_count
            },
            'comments': list(c)
        }
    })


def movies_summary(request):
    if request.method != 'GET':
        pass

    # get all requested movie ids
    movie_ids = request.GET.get('ids', '').split(',')

    # populate a summary
    # m = Movie.objects.filter(source_id__in=movie_ids)\
    #     .annotate(Avg('rating'), Count('comment'))

    m = Movie.objects.filter(source_id__in=movie_ids).annotate(
        Avg('rating__rating'),
        Count('comment', distinct=True)
    )
    print(m[0].comment__count, m[0].rating__rating__avg)
    print(m[1].comment__count, m[0].rating__rating__avg)
    print(list(m))
    print(m)