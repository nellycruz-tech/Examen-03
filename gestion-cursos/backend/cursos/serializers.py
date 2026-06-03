from rest_framework import serializers
from .models import Docente, Curso


class DocenteSerializer(serializers.ModelSerializer):
    total_cursos = serializers.IntegerField(
        source='cursos.count', read_only=True
    )

    class Meta:
        model  = Docente
        fields = '__all__'


class CursoSerializer(serializers.ModelSerializer):
    docente_nombre = serializers.CharField(
        source='docente.nombre', read_only=True
    )

    class Meta:
        model  = Curso
        fields = '__all__'