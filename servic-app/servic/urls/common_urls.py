from django.urls import path
from ..views.common_views import CommonUserProfileView

urlpatterns = [
    path('common/profile/', CommonUserProfileView.as_view(), name='common-user-profile'),
]