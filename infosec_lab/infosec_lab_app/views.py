# infosec_lab_app/views.py
from rest_framework import viewsets, permissions
from .models import News, Publication
from .serializers import NewsSerializer, PublicationSerializer

class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/news/      → список новостей (пагинируется)
    GET /api/news/{id}/ → одна новость
    """
    queryset = News.objects.all().order_by("-date")
    serializer_class = NewsSerializer
    permission_classes = [permissions.AllowAny]

class PublicationViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/publications/      → список публикаций (пагинируется)
    GET /api/publications/{id}/ → одна публикация
    """
    queryset = Publication.objects.all().order_by("-id")
    serializer_class = PublicationSerializer
    permission_classes = [permissions.AllowAny]
