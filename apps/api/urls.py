from rest_framework.routers import DefaultRouter

from .views import NewsViewSet, PublicationViewSet, StaffViewSet, ProjectViewSet

router = DefaultRouter()
router.register(r'news', NewsViewSet, basename='news')
router.register(r'publications', PublicationViewSet, basename='publication')
router.register(r"staff", StaffViewSet, basename="staff")
router.register(r"projects", ProjectViewSet, basename="project")

urlpatterns = router.urls