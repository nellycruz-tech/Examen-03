from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from django.views.static import serve # <--- 1. IMPORTA ESTO
from django.urls import re_path # <--- 2. IMPORTA ESTO

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('cursos.urls')),
    
    # 3. ESTA RUTA FORZARÁ A RENDER A MOSTRAR LAS IMÁGENES SIEMPRE:
    re_path(r'^media/(?P<path>.*)$', serve, {'document_root': settings.MEDIA_ROOT}),
]