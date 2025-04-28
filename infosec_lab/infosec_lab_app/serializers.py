from rest_framework import serializers
from .models import News, Publication, Staff

class NewsSerializer(serializers.ModelSerializer):
    class Meta:
        model = News
        fields = '__all__'  # ['id', 'title', 'excerpt', 'date', 'image', 'content']

class PublicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Publication
        fields = '__all__'  # ['id', 'title', 'authors', 'journal', 'link']

class StaffSerializer(serializers.ModelSerializer):        # ← NEW
    class Meta:
        model  = Staff
        fields = "__all__"
