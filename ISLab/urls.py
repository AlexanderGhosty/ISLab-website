from django.contrib import admin

admin.site.site_header = "ISLab Administration"
admin.site.site_title = "ISLab Admin Portal"
admin.site.index_title = "Welcome to ISLab Admin"
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

# from infosec_lab_app.views import NewsViewSet, PublicationViewSet, StaffViewSet, ProjectViewSet
#
# router = DefaultRouter()
# router.register(r'news', NewsViewSet, basename='news')
# router.register(r'publications', PublicationViewSet, basename='publication')
# router.register(r"staff", StaffViewSet, basename="staff")
# router.register(r"projects", ProjectViewSet, basename="project")

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('apps.api.urls')),
    path('', TemplateView.as_view(template_name='index.html'), name='index'),  # Главная страница
    path("news/<int:id>/", TemplateView.as_view(template_name="news_detail.html"),
         name="news_detail"),
]

from django.conf import settings
from django.conf.urls.static import static
if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
