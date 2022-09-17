from django.urls import path
from .views import CardsView, CardsDeleteUpdate, CommentListView, LikesView

urlpatterns = [
    path("add/", CardsView.as_view()),
    path("update/<int:id>", CardsDeleteUpdate.as_view()),
    path("comment/<int:card_id>", CommentListView.as_view()),
    path("likes/", LikesView.as_view())
]