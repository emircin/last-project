from django.shortcuts import render
from  rest_framework import generics 
from rest_framework.generics import RetrieveUpdateDestroyAPIView
from .models import Cards, Comment, Likes, User
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

class LikeView(generics.ListCreateAPIView):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer


class LikesView(generics.ListCreateAPIView):
    queryset = Likes.objects.all()
    serializer_class = LikesSerializer
    lookup_field = "id"

    def get_queryset(self):
        card = self.kwargs['card_id']
        return Likes.objects.filter(card_id=card, user=self.request.user)
    
    def perform_create(self, serializer):
        card = self.kwargs['card_id']
        if not Likes.objects.filter(card_id=card, user=self.request.user):
            serializer.save(user=self.request.user)
        else:
            Likes.objects.filter(user=self.request.user).delete()
            

        
        

