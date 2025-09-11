from django.urls import path
from servic.views.user_views import UserEditView
from ..views import UserProfileView, UserRoleChangeView, ChangePasswordView 

urlpatterns = [
    path("profile/", UserProfileView.as_view(), name="user-profile"),
    path(
        "users/<int:user_id>/change-role/",
        UserRoleChangeView.as_view(),
        name="change-user-role",
    ),
    path("change-password/", ChangePasswordView.as_view(), name="change-password"),
    path('profile/edit/', UserEditView.as_view(), name='personal_user_data'),
]
