from django.urls import path
from ..views import (
    ServiceProviderProfileView,

)

urlpatterns = [
    path(
        "provider/profile/",
        ServiceProviderProfileView.as_view(),
        name="provider-profile",
    ),
    
]
