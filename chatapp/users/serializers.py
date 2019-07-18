from rest_framework import serializers
from rest_framework import exceptions
from django.contrib.auth import get_user_model, authenticate

from chatapp.users.models import SecurityQuestion, SecurityAnswer

USER = get_user_model()

class RegisterSerializer(serializers.ModelSerializer):
    security_question1 = serializers.CharField()
    security_question2 = serializers.CharField()
    security_answer1 = serializers.CharField()
    security_answer2 = serializers.CharField()

    class Meta:
        model = USER
        fields = ("first_name", "last_name", "username", "email", "password",
                  "security_question1", "security_answer1", "security_question2",
                  "security_answer2")
        extra_kwargs = {"password": {"write_only": True},
                        "email": {"required": False},
                        "security_question1": {"required": False, "write_only": True},
                        "security_question2": {"required": False, "write_only": True},
                        "security_answer1": {"required": False, "write_only": True},
                        "security_answer2": {"required": False, "write_only": True},
                        }

    def create(self, validated_data):
        try:
            user = USER.objects.create_user(
                validated_data["username"],
                validated_data.get("email"),
                validated_data["password"],
                first_name=validated_data["first_name"],
                last_name=validated_data["last_name"],
            )
            if validated_data.get("security_question1") and validated_data.get("security_answer1"):
                security_question_obj = SecurityQuestion.objects.create(question=validated_data[
                    "security_question1"])
                security_question_obj.users.add(user)
                SecurityAnswer.objects.create(user=user, question=security_question_obj,
                                              answer=validated_data["security_answer1"])
            if validated_data.get("security_question2") and validated_data.get("security_answer2"):
                security_question_obj = SecurityQuestion.objects.create(question=validated_data[
                    "security_question2"])
                security_question_obj.users.add(user)
                SecurityAnswer.objects.create(user=user, question=security_question_obj,
                                              answer=validated_data["security_answer2"])
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
