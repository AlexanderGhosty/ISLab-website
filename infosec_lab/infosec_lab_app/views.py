# infosec_lab_app/views.py
from rest_framework import viewsets, permissions
from .models import News, Publication, Staff, Project
from .serializers import NewsSerializer, PublicationSerializer, StaffSerializer, ProjectSerializer

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

class StaffViewSet(viewsets.ReadOnlyModelViewSet): 
    """
    GET /api/staff/       → список сотрудников
    GET /api/staff/{id}/  → один сотрудник
    """
    queryset           = Staff.objects.all()
    serializer_class   = StaffSerializer
    permission_classes = [permissions.AllowAny]
    
    pagination_class   = None 

class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/projects/      → список проектов (пагинируется)
    GET /api/projects/{id}/ → один проект
    """
    queryset           = Project.objects.all()
    serializer_class   = ProjectSerializer
    permission_classes = [permissions.AllowAny]