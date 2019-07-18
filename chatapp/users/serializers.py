from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.auth import get_user_model, authenticate

USER = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = USER
        fields = ("first_name", "last_name", "username", "email", "password",
                  "security_question1", "security_answer1", "security_question2",
                  "security_answer2")
        extra_kwargs = {"password": {"write_only": True},
                        "email": {"required": False},
                        "security_answer1": {"write_only": True},
                        "security_answer2": {"write_only": True},
                        }

    def create(self, validated_data):
        try:
            user = USER.objects.create_user(
                validated_data["username"],
                validated_data.get("email"),
                validated_data["password"],
                first_name=validated_data["first_name"],
                last_name=validated_data["last_name"],
                security_question1=validated_data["security_question1"],
                security_answer1=validated_data["security_question1"],
                security_question2=validated_data["security_question2"],
                security_answer2=validated_data["security_answer2"]
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
