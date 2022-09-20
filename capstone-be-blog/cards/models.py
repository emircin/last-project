from django.db import models
from django.contrib.auth.models import User
from django.utils import timezone

class Cards(models.Model):
    title = models.CharField(max_length=50)
    image = models.CharField(max_length=250)
    content = models.CharField(max_length=350)
    author = models.ForeignKey(User, on_delete=models.CASCADE, related_name="author")
    date_created = models.DateTimeField(auto_now_add=True)


    def __str__(self):
        return f'{self.title.capitalize()}'

class Likes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey(Cards, on_delete=models.CASCADE, related_name="likes")

    def __str__(self):
        return f'{self.card}'

class Comment(models.Model):
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    card = models.ForeignKey(Cards, on_delete=models.CASCADE, related_name="comment")
    created_date = models.DateTimeField(default=timezone.now)
    text = models.TextField()

    def __str__(self):
        return self.text
