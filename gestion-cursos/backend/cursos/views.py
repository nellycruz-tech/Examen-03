from rest_framework import viewsets
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from .models import Docente, Curso
from .serializers import DocenteSerializer, CursoSerializer


class DocenteViewSet(viewsets.ModelViewSet):
    queryset         = Docente.objects.all()
    serializer_class = DocenteSerializer
    parser_classes   = [MultiPartParser, FormParser, JSONParser]


class CursoViewSet(viewsets.ModelViewSet):
    queryset         = Curso.objects.all()
    serializer_class = CursoSerializer
    parser_classes   = [MultiPartParser, FormParser, JSONParser]