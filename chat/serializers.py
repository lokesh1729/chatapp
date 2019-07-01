from rest_framework import serializers
from .models import Message


class MessageSerializer(serializers.ModelSerializer):
    sender_name = serializers.ReadOnlyField(source="sender.user.username")

    class Meta:
        model = Message
        fields = ("id", "created_on", "updated_on", "text", "sender", "sender_name", "room")
        read_only_fields = ("id", "sender_name")
