from rest_framework import serializers
from .models import News, Publication

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'  # ['id', 'title', 'excerpt', 'date', 'image', 'content']

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'  # ['id', 'title', 'authors', 'journal', 'link']
