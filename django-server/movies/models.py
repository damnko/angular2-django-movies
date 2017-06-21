from django.db import models
from django.core.validators import MinLengthValidator

# Create your models here.
class Movie(models.Model):
    source_id = models.CharField(max_length=100, primary_key=True)
    title = models.CharField(max_length=200)

    def __str__(self):
        return 'ID: ' + self.source_id

    def save(self, *args, **kwargs):
        # movie ID has to be unique (should probably make it a primary key)
        if Movie.objects.filter(source_id = self.source_id).exists():
            raise ValueError('The movie with ID %s is already present' % self.source_id)
        else:
            # save
            super(Movie, self).save(*args, **kwargs)


class Rating(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    rating = models.PositiveIntegerField()
    username = models.CharField(max_length=100, validators=[MinLengthValidator(1)])

    def __str__(self):
        return 'ID: %s | Vote: %s' % (self.movie, self.rating)

    def save(self, *args, **kwargs):
        self.full_clean()
        super(Rating, self).save(*args, **kwargs)


class Comment(models.Model):
    movie = models.ForeignKey(Movie, on_delete=models.CASCADE)
    username = models.CharField(max_length=100, validators=[MinLengthValidator(1)])
    body = models.TextField()
    date = models.DateTimeField(auto_now=True)

    def __str__(self):
        return self.body

    def save(self, *args, **kwargs):
        self.full_clean()
        super(Comment, self).save(*args, **kwargs)
