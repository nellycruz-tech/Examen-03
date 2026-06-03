from django.contrib import admin
from .models import Docente, Curso

@admin.register(Docente)
class DocenteAdmin(admin.ModelAdmin):
    list_display  = ['nombre', 'especialidad', 'correo']
    search_fields = ['nombre', 'correo']

@admin.register(Curso)
class CursoAdmin(admin.ModelAdmin):
    list_display  = ['nombre', 'nivel', 'duracion', 'docente']
    list_filter   = ['nivel']
    search_fields = ['nombre']