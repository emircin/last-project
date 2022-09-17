from django.shortcuts import render
from  rest_framework import generics 
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .models import Cards, Comment, Likes
from .serializers import CardsSerializer, CommentSerializer, LikesSerializer

class CardsView(generics.ListCreateAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer

    def perform_create(self, serializer):
         serializer.save(author=self.request.user)

class CardsDeleteUpdate(RetrieveUpdateDestroyAPIView):
    queryset = Cards.objects.all()
    serializer_class = CardsSerializer
    lookup_field = "id"

class CommentListView(generics.ListCreateAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    lookup_field = "id"

    def get_queryset(self):

       card = self.kwargs['card_id']
       return Comment.objects.filter(card_id=card)

    def perform_create(self, serializer):
         serializer.save(author=self.request.user)


class LikesView(generics.ListCreateAPIView):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer
    

    def get_queryset(self):

        print(self.kwargs)

        # card = self.kwargs['user']
        return Likes.objects.all()

