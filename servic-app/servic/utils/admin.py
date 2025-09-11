from rest_framework.pagination import PageNumberPagination
from rest_framework.response import Response
from rest_framework import status
from django.shortcuts import get_object_or_404
from django.utils import timezone


def get_pending_profiles(request, user_type, serializer_class):
    pending_profiles = user_type.filter(is_verified=False).order_by('created_at')
    paginator = PageNumberPagination()
    paginator.page_size = 10
    paginated_profiles = paginator.paginate_queryset(pending_profiles, request)

    data = []
    for profile in paginated_profiles:
        user = profile.user
        data.append({
            "user_id": user.id,
            "email": user.email,
            "full_name": f"{user.first_name} {user.last_name}",
            "user_type": user.user_type,
            "is_profile_complete": user.is_profile_complete,
            "profile": serializer_class(profile).data
        })
    return paginator.get_paginated_response(data)

def get_verify_profile(request, user, profile_attr, serializer_class, profile_model):
    
    try:
        profile = getattr(user, profile_attr)
    except Exception:
        return Response(
            {"detail": f"No se encontró un perfil {profile_attr}"},
            status=status.HTTP_404_NOT_FOUND
        )

    serializer = serializer_class(profile)
    return Response(
        {
            "user_info": {
                "id": user.id,
                "email": user.email,
                "full_name": f"{user.first_name} {user.last_name}",
                "user_type": user.user_type,
                "date_joined": user.date_joined,
                "is_profile_complete": user.is_profile_complete,
            },
            "profile": serializer.data
        }
    )


def verify_profile(user, profile_attr, serializer_class,request, approved_type, rejected_type):
    try:
        profile = getattr(user, profile_attr)
    except Exception: 
        return Response(
            {"detail": f"No se encontró un perfil {profile_attr}"},
            status=status.HTTP_404_NOT_FOUND
        )
    
    status_value = request.data.get("status")  # approved / rejected
    admin_response = request.data.get("admin_response", "")
    
    if status_value not in ["approved", "rejected"]:
            return Response(
                {"detail": "Debe especificar 'approved' o 'rejected'"},
                status=status.HTTP_400_BAD_REQUEST,
            )
    
    profile.status = status_value
    profile.admin_response = admin_response
    profile.reviewed_by = request.user
    profile.reviewed_at = timezone.now()
    profile.is_verified = (status_value == "approved")
    profile.save()

    if status_value == "approved":
        user.user_type = approved_type
        user.is_profile_complete = True
        user.save()
    else:
        user.user_type = rejected_type
        user.is_profile_complete = False
        user.save()

    serializer = serializer_class(profile)
    return serializer.data, None