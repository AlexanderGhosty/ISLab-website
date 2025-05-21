from rest_framework import serializers

from apps.news.models import NewsImage, News
from apps.projects.models import Project
from apps.publications.models import Publication
from apps.staff.models import Staff


class NewsImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = NewsImage
        fields = ("image",)  # вернём только URL


class NewsSerializer(serializers.ModelSerializer):
    gallery = NewsImageSerializer(source="images", many=True, read_only=True)

    class Meta:
        model = News
        fields = "__all__"  # ['id', 'title', 'excerpt', 'date', 'image', 'content']


class ProjectSerializer(serializers.ModelSerializer):
    class Meta:
        model = Project
        fields = "__all__"


class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'  # ['id', 'title', 'authors', 'journal', 'link']


class StaffSerializer(serializers.ModelSerializer):
    class Meta:
        model = Staff
        fields = "__all__"
