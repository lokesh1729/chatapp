from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

USER = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ("first_name", "last_name", "username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}, "email": {"required": False}}

    def create(self, validated_data):
        user = USER.objects.create_user(
            validated_data["username"],
            validated_data.get("email"),
            validated_data["password"],
            first_name=validated_data.get("first_name"),
            last_name=validated_data.get("last_name"),
        )

        return user


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ("first_name", "last_name", "username")


class LoginSerializer(serializers.Serializer):

    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, attrs):
        user = authenticate(**attrs)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Invalid username and password")
