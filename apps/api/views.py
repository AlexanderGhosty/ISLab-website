from django.shortcuts import render
from rest_framework import viewsets, permissions

from .pagination import NewsPagination

from .serializers import NewsSerializer, ProjectSerializer, PublicationSerializer, StaffSerializer
from apps.news.models import News
from apps.projects.models import Project
from apps.publications.models import Publication
from apps.staff.models import Staff


class NewsViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/news/      → список новостей (пагинируется)
    GET /api/news/{id}/ → одна новость
    """
    queryset = News.objects.all().order_by("-date")
    serializer_class = NewsSerializer
    permission_classes = [permissions.AllowAny]
    pagination_class = NewsPagination


class ProjectViewSet(viewsets.ReadOnlyModelViewSet):
    """
    GET /api/projects/      → список проектов (пагинируется)
    GET /api/projects/{id}/ → один проект
    """
    queryset           = Project.objects.all()
    serializer_class   = ProjectSerializer
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
    GET /api/staff/       → список сотрудников (пагинируется)
    GET /api/staff/{id}/  → один сотрудник
    """
    queryset = Staff.objects.all()
    serializer_class = StaffSerializer
    permission_classes = [permissions.AllowAny]