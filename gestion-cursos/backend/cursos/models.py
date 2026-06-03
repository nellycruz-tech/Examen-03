from django.db import models


class Docente(models.Model):
    nombre       = models.CharField(max_length=150)
    especialidad = models.CharField(max_length=150)
    correo       = models.EmailField(unique=True)
    imagen       = models.ImageField(upload_to='docentes/', blank=True, null=True)

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre


class Curso(models.Model):
    NIVEL_CHOICES = [
        ('basico',     'Básico'),
        ('intermedio', 'Intermedio'),
        ('avanzado',   'Avanzado'),
    ]

    nombre   = models.CharField(max_length=200)
    duracion = models.PositiveIntegerField(help_text='Duración en horas')
    nivel    = models.CharField(max_length=20, choices=NIVEL_CHOICES, default='basico')
    imagen   = models.ImageField(upload_to='cursos/')
    docente  = models.ForeignKey(
        Docente,
        on_delete=models.CASCADE,
        related_name='cursos'
    )

    class Meta:
        ordering = ['nombre']

    def __str__(self):
        return self.nombre