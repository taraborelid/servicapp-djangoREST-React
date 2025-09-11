from .auth_views import (
    RegisterView,
    CustomTokenObtainPairView,
    LogoutView,
    PasswordResetRequestView,
    PasswordResetConfirmView,
)
from .user_views import UserProfileView, UserRoleChangeView, ChangePasswordView, UserEditView
from .provider_views import (
    ServiceProviderProfileView,
)
from .common_views import (
    CommonUserProfileView,
)
from .service_views import (
    ServiceCategoryListView,
    ServiceCategoryDetailView,
    ServiceCreateView,
    ServiceListView,
    ServiceDetailView,
    ServiceImageUploadView,
    ServiceImageDeleteView,
    ServiceImageSetPrimaryView,
)

from .admin_views import (
    AdminDashboardView,
    AdminProviderListView,
    AdminProviderVerificationView,
    AdminServiceListView,
    AdminServiceApprovalView,
    AdminPendingProviderRequestsView,
    AdminCommonProfileVerificationView,
    AdminPendingCommonRequestsView,
)

__all__ = [
    "RegisterView",
    "CustomTokenObtainPairView",
    "LogoutView",
    "PasswordResetRequestView",
    "PasswordResetConfirmView",
    "UserProfileView",
    "UserRoleChangeView",
    "ChangePasswordView",
    "ServiceProviderProfileView",
    #"ProviderRequestView",
    #"ProviderRequestListView",
    #"ProviderRequestDetailView",
    "ServiceCategoryListView",
    "ServiceCategoryDetailView",
    "ServiceCreateView",
    "ServiceListView",
    "ServiceDetailView",
    "ServiceImageUploadView",
    "ServiceImageDeleteView",
    "ServiceImageSetPrimaryView",
    # Nuevas vistas admin
    "AdminDashboardView",
    "AdminProviderListView",
    "AdminProviderVerificationView",
    "AdminServiceListView",
    "AdminServiceApprovalView",
    "AdminPendingProviderRequestsView",
    "CommonUserProfileView",
    "AdminCommonProfileVerificationView",
    "AdminPendingCommonRequestsView",
    "UserEditView"
]
