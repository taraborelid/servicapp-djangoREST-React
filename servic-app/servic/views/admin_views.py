from rest_framework.views import APIView
from rest_framework import permissions, status, generics
from rest_framework.response import Response
from django.contrib.auth import get_user_model
from django.shortcuts import get_object_or_404
from django.utils import timezone
from ..models import ServiceProviderProfile, Service, CommonUserProfile
from ..serializers import (
    ServiceProviderProfileSerializer,
    ServiceSerializer,
    ServiceListSerializer,
    CommonUserProfileSerializer,
)
from drf_spectacular.utils import extend_schema
from rest_framework.pagination import PageNumberPagination
from ..utils.admin import get_pending_profiles, get_verify_profile, verify_profile


User = get_user_model()

@extend_schema(
    summary="Dashboard de administrador",
    description="Muestra información general y estadísticas para el administrador."
)

class AdminDashboardView(APIView):
    """Vista del dashboard administrativo con estadísticas"""

    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        stats = {
            "total_users": User.objects.count(),
            "total_providers": User.objects.filter(user_type="provider").count(),
            "pending_provider_requests": ServiceProviderProfile.objects.filter(
                status="pending"
            ).count(),
            "unverified_providers": ServiceProviderProfile.objects.filter(
                is_verified=False
            ).count(),
            "pending_services": Service.objects.filter(status="pending").count(),
            "active_services": Service.objects.filter(status="active").count(),
        }
        return Response(stats)

@extend_schema(
    summary="Listar prestadores de servicios",
    description="Permite al administrador ver la lista de todos los prestadores de servicios registrados en el sistema. Se pueden aplicar filtros opcionales como el estado de verificación."
)

class AdminProviderListView(generics.ListAPIView):
    """Listar todos los prestadores para admin"""

    permission_classes = [permissions.IsAdminUser]
    serializer_class = ServiceProviderProfileSerializer

    def get_queryset(self):
        queryset = ServiceProviderProfile.objects.all()

        # Filtros opcionales
        is_verified = self.request.query_params.get("is_verified")
        if is_verified is not None:
            queryset = queryset.filter(is_verified=is_verified.lower() == "true")

        return queryset.order_by("-created_at")

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        providers_data = []
        for profile in queryset:
            data = self.get_serializer(profile).data
            data["user_info"] = {
                "id": profile.user.id,
                "email": profile.user.email,
                "full_name": f"{profile.user.first_name} {profile.user.last_name}",
                "date_joined": profile.user.date_joined,
            }
            providers_data.append(data)

        return Response(providers_data)
@extend_schema(
    summary="Listar solicitudes de prestadores de servicios",
    description="Permite al administrador ver la lista de todos los prestadores que estan enviando el formulario para solicitar ser trabajadores."
)

class AdminPendingCommonRequestsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        user_type = CommonUserProfile.objects
        return get_pending_profiles(request, user_type, CommonUserProfileSerializer)

@extend_schema(
    summary="Listar solicitudes de prestadores de servicios",
    description="Permite al administrador ver la lista de todos los prestadores que estan enviando el formulario para solicitar ser trabajadores."
)

class AdminPendingProviderRequestsView(APIView):
    permission_classes = [permissions.IsAdminUser]

    def get(self, request):
        user_type = ServiceProviderProfile.objects
        return get_pending_profiles(request, user_type, ServiceProviderProfileSerializer)

class AdminCommonProfileVerificationView(APIView):
    """Vista para que admins verifiquen/desverifiquen perfiles comunes"""

    permission_classes = [permissions.IsAdminUser]

    @extend_schema(
    summary="Ver informacion completa del perfil comun",
    description="Permite al administrador mediante un el numero de id ver la información completa de un perfil comun."
    )

    def get(self, request, user_id):
        """Ver información completa del perfil comun"""
        user = get_object_or_404(User, id=user_id)
        data, error = get_verify_profile(
            request,
            user,
            "common_profile",
            CommonUserProfileSerializer,
            CommonUserProfile
        )
        return Response(data)

    @extend_schema(
    summary="Aprobar o rechazar perfil comun",
    description="Permite al administrador ver la información completa de un perfil comun y aprobar o desaprobar la solicitud del mismo."
    )

    def put(self, request, user_id):
        user = get_object_or_404(User, id=user_id)
        data, error = verify_profile(
            user,
            "common_profile",
            CommonUserProfileSerializer,
            request,
            "common_verified",
            "common"
        )
        return Response({"message": f"Perfil {request.data.get('status')} exitosamente", "profile": data})

class AdminProviderVerificationView(APIView):
    """Vista para que admins verifiquen/desverifiquen prestadores"""

    permission_classes = [permissions.IsAdminUser]

    @extend_schema(
    summary="Ver informacion completa del prestador",
    description="Permite al administrador mediante un el numero de id ver la información completa de un prestador."
    )

    def get(self, request, user_id):
        """Ver información completa del prestador"""
        user = get_object_or_404(User, id=user_id)

        data, error = get_verify_profile(
            request,
            user,
            "provider_profile",
            ServiceProviderProfileSerializer,
            ServiceProviderProfile
        )
        return Response(data)

    @extend_schema(
    summary="Aprobar o rechazar prestador",
    description="Permite al administrador ver la información completa de un prestador y aprobar o desaprobar la solicitud del mismo."
    )

    def put(self, request, user_id):
        """Verificar/desverificar prestador"""
        user = get_object_or_404(User, id=user_id)
        data, error = verify_profile(
            user,
            "provider_profile",
            ServiceProviderProfileSerializer,
            request,
            "provider_verified",
            "provider"
        )
        return Response({"message": f"Perfil {request.data.get('status')} exitosamente", "profile": data})

@extend_schema(
    summary="Listar servicios para aprobación",
    description="Permite al administrador ver la lista de servicios registrados en el sistema, con la opción de filtrar por estado (pendiente, activo, inactivo) para su revisión y aprobación."
)

class AdminServiceListView(generics.ListAPIView):
    """Listar servicios para aprobación admin"""

    permission_classes = [permissions.IsAdminUser]
    serializer_class = ServiceListSerializer

    def get_queryset(self):
        queryset = Service.objects.all()

        # Filtros
        status_filter = self.request.query_params.get("status")
        if status_filter:
            queryset = queryset.filter(status=status_filter)

        return queryset.order_by("-created_at")


@extend_schema(
    summary="Aprobar servicio",
    description="Permite al administrador aprobar un servicio por su ID."
)

class AdminServiceApprovalView(APIView):
    """Aprobar/rechazar servicios"""

    permission_classes = [permissions.IsAdminUser]

    def put(self, request, service_id):
        service = get_object_or_404(Service, id=service_id)

        new_status = request.data.get("status")
        admin_comment = request.data.get("admin_comment", "")

        if new_status not in ["active", "inactive", "pending"]:
            return Response(
                {"detail": "Status debe ser: active, inactive o pending"},
                status=status.HTTP_400_BAD_REQUEST,
            )

        service.status = new_status
        service.save()

        serializer = ServiceSerializer(service)

        return Response(
            {
                "message": f"Servicio {new_status} exitosamente",
                "service": serializer.data,
            }
        )
