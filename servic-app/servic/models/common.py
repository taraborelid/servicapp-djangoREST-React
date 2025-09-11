from django.db import models
from .user import User

# Perfil completo del usuario comun

class CommonUserProfile(models.Model):
    STATUS_CHOICES = (
        ("pending", "Pendiente"),
        ("approved", "Aprobada"),
        ("rejected", "Rechazada"),
    )

    user = models.OneToOneField(
        User, on_delete=models.CASCADE, related_name="common_profile"
    )
    
    # Personal data (solo datos de verificación, los personales están en User)
    identification_type = models.CharField(
        max_length=20,
        choices=[
            ("dni", "DNI"),
            ("ce", "Carné de Extranjería"),
            ("passport", "Pasaporte"),
        ],
    )
    identification_number = models.CharField(max_length=20)

    # Field that we brought from Provider
    id_front = models.FileField(upload_to="id_front/")
    id_back = models.FileField(upload_to="id_back/")
    status = models.CharField(max_length=10, choices=STATUS_CHOICES, default="pending")
    admin_response = models.TextField(blank=True, null=True)
    reviewed_by = models.ForeignKey(
        User,
        on_delete=models.SET_NULL,
        null=True,
        blank=True,
        related_name="reviewed_common_profiles"
    )
    reviewed_at = models.DateTimeField(null=True, blank=True)

    # Auditory
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    # Final verification
    is_verified = models.BooleanField(default=False)

    def __str__(self):
        return f"Perfil de {self.user.email} - {self.get_status_display()}"

    class Meta:
        verbose_name = "Perfil de Usuario"
        verbose_name_plural = "Perfiles de Usuarios"