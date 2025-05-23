from django.urls import path

from .views import NewsListView, NewsDetailView

urlpatterns = [
    path('', NewsListView.as_view(), name='index'),
    path("news/<int:id>/", NewsDetailView.as_view(), name="news_detail"),
]