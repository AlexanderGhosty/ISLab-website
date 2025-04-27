from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework.routers import DefaultRouter

from infosec_lab_app.views import NewsViewSet, PublicationViewSet

router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'publications', PublicationViewSet, basename='publication')

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include(router.urls)),        # Подключение маршрутов API /api/news/ и /api/publications/
    path('', TemplateView.as_view(template_name='index.html'), name='index'),  # Главная страница
]

# В режиме DEBUG раздаём медиа-файлы (загруженные изображения) через Django:
from django.conf import settings
from django.conf.urls.static import static
if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
