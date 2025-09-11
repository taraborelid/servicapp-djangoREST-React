from rest_framework.views import APIView
from rest_framework import permissions, status
from rest_framework.response import Response
from ..models.common import CommonUserProfile
from ..serializers import CommonUserProfileSerializer

class CommonUserProfileView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        try:
            profile = request.user.common_profile
        except CommonUserProfile.DoesNotExist:
            return Response({"detail": "No se encontró un perfil común"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CommonUserProfileSerializer(profile)
        return Response(serializer.data)

    def post(self, request):
        if hasattr(request.user, "common_profile"):
            return Response({"detail": "Ya existe un perfil común"}, status=status.HTTP_400_BAD_REQUEST)
        serializer = CommonUserProfileSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save(user=request.user, status="pending")
            return Response({"message": "Solicitud enviada, pendiente de revisión", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def put(self, request):
        try:
            profile = request.user.common_profile
        except CommonUserProfile.DoesNotExist:
            return Response({"detail": "No se encontró un perfil común"}, status=status.HTTP_404_NOT_FOUND)
        serializer = CommonUserProfileSerializer(profile, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"message": "Perfil actualizado exitosamente", "data": serializer.data})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)