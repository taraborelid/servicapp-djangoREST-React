from django.contrib import admin
from ..models import ServiceProviderProfile


# Configuración para el perfil de prestador
class ServiceProviderProfileAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "identification_type",
        "identification_number",
        "is_verified",
        "created_at",
    )
    list_filter = ("is_verified", "identification_type", "created_at")
    search_fields = ("user__email", "identification_number")
    readonly_fields = ("created_at", "updated_at")


# Configuración para las solicitudes de prestador


