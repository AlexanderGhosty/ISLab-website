from django.shortcuts import render
from django.views.generic import ListView, DetailView
from rest_framework import viewsets, permissions

from .models import News


# Create your views here.

class NewsListView(ListView):
    model = News
    template_name = 'index.html'
    context_object_name = 'news_list'

class NewsDetailView(DetailView):
    model = News
    template_name = 'news_detail.html'
    pk_url_kwarg = 'id'
    context_object_name = 'news'