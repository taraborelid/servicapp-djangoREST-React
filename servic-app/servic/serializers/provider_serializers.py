from rest_framework import serializers
from ..models import ServiceProviderProfile


class ServiceProviderProfileSerializer(serializers.ModelSerializer):

    
    identification_number = serializers.CharField(
        required=True,
        error_messages={
            "required": "El número de identificación es obligatorio",
            "invalid": "El número de identificación no es válido",
        },
    )
    certification_file = serializers.FileField(
        required=True,
        error_messages={
            "required": "El archivo de certificación es obligatorio",
            "invalid": "El archivo de certificación no es válido",
        },
    )
    phone_number = serializers.CharField(source='user.phone_number', required=True,
        error_messages={
            "required": "El número de teléfono es obligatorio",
            "invalid": "El número de teléfono no es válido",
        },
    )
    date_of_birth = serializers.DateField(source='user.date_of_birth', required=True,
        error_messages={
            "required": "La fecha de nacimiento es obligatoria",
            "invalid": "La fecha de nacimiento no es válida",
        },
    )
    gender = serializers.CharField(source='user.gender', required=True,
        error_messages={
            "required": "El género es obligatorio",
            "invalid": "El género no es válido",
        },
    )
    address = serializers.CharField(source='user.address', required=True,
        error_messages={
            "required": "La dirección es obligatoria",
            "invalid": "La dirección no es válida",
        },
    )
    zip_code = serializers.CharField(source='user.zip_code', required=True,
        error_messages={
            "required": "El código postal es obligatorio",
            "invalid": "El código postal no es válido",
        },
    )
    city = serializers.CharField(source='user.city', required=True,
        error_messages={
            "required": "La ciudad es obligatoria",
            "invalid": "La ciudad no es válida",
        },
    )
    state = serializers.CharField(source='user.state', required=True,
        error_messages={
            "required": "El estado es obligatorio",
            "invalid": "El estado no es válido",
        },
    )
    country = serializers.CharField(source='user.country', required=True,
        error_messages={
            "required": "El país es obligatorio",
            "invalid": "El país no es válido",
        },
    )
    id_front = serializers.FileField(
        required=True,
        error_messages={
            "required": "El archivo de identificación frontal es obligatorio",
            "invalid": "El archivo de identificación frontal no es válido",
        },
    )
    id_back = serializers.FileField(
        required=True,
        error_messages={
            "required": "El archivo de identificación posterior es obligatorio",
            "invalid": "El archivo de identificación posterior no es válido",
        },
    )
    certification_description = serializers.CharField(
        required=True,
        error_messages={
            "required": "La descripción de la certificación es obligatoria",
            "invalid": "La descripción de la certificación no es válida",
        },
    )


    class Meta:
        model = ServiceProviderProfile
        fields = [
            "id",
            "identification_type",
            "identification_number",
            "phone_number",
            "date_of_birth",
            "gender",
            "address",
            "zip_code",
            "city",
            "state",
            "country",
            "certification_file",
            "certification_description",
            "years_of_experience",
            "id_front",
            "id_back",
            "status",
            "admin_response",
            "is_verified",
            "created_at",
            "updated_at",
        ]
        read_only_fields = [
            "id",
            "status",
            "admin_response",
            "is_verified",
            "created_at",
            "updated_at",
        ]
    def update(self, instance, validated_data):
        user_data = validated_data.pop('user', {})
        user = instance.user
        for attr, value in user_data.items():
            setattr(user, attr, value)
        user.save()
        return super().update(instance, validated_data)

    # Metodo para validar el número de identificación y poder actualizar de common a provider
    def validate_identification_number(self, value):
        user = self.context['request'].user
        # Busca si existe otro perfil con ese número y distinto usuario
        exists = ServiceProviderProfile.objects.filter(
            identification_number=value
        ).exclude(user=user).exists()
        if exists:
            raise serializers.ValidationError("El número de identificación ya está en uso por otro usuario.")
        return value


    def validate_id_front_back(self, value):
        allowed_types = ["image/jpeg", "image/png", "application/pdf"]
        if value.content_type not in allowed_types:
            raise serializers.ValidationError(
                "El archivo debe ser una imagen (JPEG, PNG) o un PDF"
            )

        if value.size > 5 * 1024 * 1024:  # 5MB en bytes
            raise serializers.ValidationError("El archivo no debe superar los 5MB")
        return value
    
    def validate_certification_file(self, value):
        allowed_types = ["image/jpeg", "image/png", "application/pdf"]
        if value.content_type not in allowed_types:
            raise serializers.ValidationError(
                "El archivo debe ser una imagen (JPEG, PNG) o un PDF"
            )

        if value.size > 5 * 1024 * 1024:  # 5MB en bytes
            raise serializers.ValidationError("El archivo no debe superar los 5MB")
        return value

    def validate_identification_number(self, value):
        if ServiceProviderProfile.objects.filter(identification_number=value).exists():
            raise serializers.ValidationError(
                "Este número de identificación ya está registrado"
            )
        return value

    def validate_phone_number(self, value):
        if not value.replace("+", "").replace("-", "").replace(" ", "").isdigit():
            raise serializers.ValidationError(
                "El número de teléfono debe contener solo dígitos, espacios, guiones y el símbolo +"
            )
        return value

