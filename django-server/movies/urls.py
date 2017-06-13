from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'^get-all$', views.movies_summary, name='movies summary'),
    url(r'^movie/new$', views.new_movie, name='new movie'),
    url(r'^movie/(?P<movie_id>[a-zA-Z0-9]+)/$', views.movie_details, name='movie details'),
    url(r'^movie/(?P<movie_id>[a-zA-Z0-9]+)/rating/$', views.getRating, name='get movie rating'),
    url(r'^rate$', views.rate, name='rate'),
    url(r'^comment$', views.comment, name='comment'),
    url(r'^comment/(?P<id>[0-9]+)/$', views.update_comment, name='update comment')
]