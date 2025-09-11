from django.urls import path
from ..views import (
    AdminProviderVerificationView,
    AdminProviderListView,
    AdminServiceApprovalView,
    AdminServiceListView,
    AdminDashboardView,
    AdminPendingProviderRequestsView,
    AdminCommonProfileVerificationView,
    AdminPendingCommonRequestsView,
)

urlpatterns = [
    # Panel de administración (estadisticas)
    path(
        "admin/dashboard/",
        AdminDashboardView.as_view(),
        name="admin-dashboard",
    ),
    # Gestión de prestadores por admin (listado, verificación, etc)
    path(
        "admin/providers/",
        AdminProviderListView.as_view(),
        name="admin-provider-list",
    ),
    # Verificación formulario de prestador para convertirse en provider
    path(
        "admin/providers/<int:user_id>/verify/",
        AdminProviderVerificationView.as_view(),
        name="admin-verify-approval-provider-request",
    ),
    # Verificación formulario de usuario comun para verificarlo
    path(
        "admin/commonuser/<int:user_id>/verify/",
        AdminCommonProfileVerificationView.as_view(),
        name="admin-verify-approval-commonuser-request",
    ),
    # Consulta todas las solicitudes de los trabajadores
    path(
        "admin/providers/requests/",
        AdminPendingProviderRequestsView.as_view(),
        name="admin-provider-requests",
    ),
    # Consulta todas las solicitudes de los trabajadores
    path(
        "admin/commonusers/requests/",
        AdminPendingCommonRequestsView.as_view(),
        name="admin-common-requests",
    ),
    # Gestión de servicios por admin (listado, aprobación, etc)
    path(
        "admin/services/",
        AdminServiceListView.as_view(),
        name="admin-service-list",
    ),
    # Aprobar/rechazar servicios por admin
    path(
        "admin/services/<int:service_id>/approve/",
        AdminServiceApprovalView.as_view(),
        name="admin-approve-service",
    ),
    
]
