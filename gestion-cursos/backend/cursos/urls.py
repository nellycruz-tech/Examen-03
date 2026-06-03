from rest_framework.routers import DefaultRouter
from .views import DocenteViewSet, CursoViewSet

router = DefaultRouter()
router.register(r'docentes', DocenteViewSet)
router.register(r'cursos',   CursoViewSet)

urlpatterns = router.urls