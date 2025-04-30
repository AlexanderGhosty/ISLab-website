from rest_framework import serializers
from .models import News, Publication, Staff, Project, NewsImage

class NewsImageSerializer(serializers.ModelSerializer):
    class Meta:
        model  = NewsImage
        fields = ("image",)          # вернём только URL

class NewsSerializer(serializers.ModelSerializer):
    gallery = NewsImageSerializer(source="images", many=True, read_only=True)

    class Meta:
        model  = News
        fields = "__all__"   # ['id', 'title', 'excerpt', 'date', 'image', 'content']

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'  # ['id', 'title', 'authors', 'journal', 'link']

class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Staff
        fields = "__all__"


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model  = Project
        fields = "__all__"
