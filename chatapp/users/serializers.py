from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.auth import get_user_model, authenticate

USER = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ("first_name", "last_name", "username", "email", "password")
        extra_kwargs = {"password": {"write_only": True}, "email": {"required": False}}

    def create(self, validated_data):
        try:
            user = USER.objects.create_user(
                validated_data["username"],
                validated_data.get("email"),
                validated_data["password"],
                first_name=validated_data["first_name"],
                last_name=validated_data["last_name"],
            )
        except KeyError as exc:
            raise exceptions.ValidationError("Missing %s in request body" % exc)

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
