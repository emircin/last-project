from dataclasses import fields
from rest_framework import serializers
from .models import Cards, Likes, Comment, Views

class LikesSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    card = serializers.StringRelatedField(read_only=True)
    card_id = serializers.IntegerField()

    class Meta:
        model = Likes
        fields = (
            "id",
            "user",
            "card",
            "card_id"
        )

class ViewsSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)
    card = serializers.StringRelatedField(read_only=True)
    card_id = serializers.IntegerField()

    class Meta:
        model = Views
        fields = (
            "id",
            "user",
            "card",
            "card_id"
        )



class CommentSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    card = serializers.StringRelatedField(read_only=True)
    card_id = serializers.IntegerField()

    class Meta:
        model = Comment
        fields = (
            "id",
            "card",
            "text",
            "author",
            "card_id",
        )

class CardsSerializer(serializers.ModelSerializer):
    author = serializers.StringRelatedField(read_only=True)
    comment = CommentSerializer(many=True, required=False)
    comment_count = serializers.SerializerMethodField(read_only=True)
    likes = LikesSerializer(many=True, required=False)
    likes_count = serializers.SerializerMethodField(read_only=True)
    views = ViewsSerializer(many=True, required=False)
    views_count = serializers.SerializerMethodField(read_only=True)
    

    class Meta:
        model = Cards
        fields = (
            "title",
            "image",
            "content",
            "date_created",
            "author",
            "id",
            "comment",
            "comment_count",
            "likes",
            "likes_count",
            "views",
            "views_count",
        )

    def get_comment_count(self, cards):
        return cards.comment.count()

    def get_likes_count(self, cards):
        return cards.likes.count()

    def get_views_count(self, cards):
        return cards.views.count()

