from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.contrib.auth import get_user_model

USER = get_user_model()

# Create your models here.
class BaseModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)


class Message(BaseModel):
    text = models.TextField(blank=True, null=True)
    sender = models.ForeignKey(
        USER,
        on_delete=models.CASCADE,
        related_name="sent_messages",
        related_query_name="sent_message",
    )
    receiver = models.ForeignKey(
        USER,
        on_delete=models.CASCADE,
        related_name="received_messages",
        related_query_name="received_message",
    )


class Room(BaseModel):
    name = models.CharField(_("Name of the room"), max_length=255)
    room_message = models.ForeignKey(
        Message,
        on_delete=models.CASCADE,
        related_name="rooms",
        related_query_name="room",
    )
    participant = models.ForeignKey(
        USER, on_delete=models.CASCADE, related_name="rooms", related_query_name="room"
    )
