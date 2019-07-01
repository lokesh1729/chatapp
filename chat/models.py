from django.db import models
from django.contrib.auth import get_user_model
from django.utils.translation import ugettext_lazy as _

USER = get_user_model()


# Create your models here.
class BaseModel(models.Model):
    created_on = models.DateTimeField(auto_now_add=True)
    updated_on = models.DateTimeField(auto_now=True)


class ChatRoom(BaseModel):
    name = models.CharField(_("Name of the room"), max_length=255, primary_key=True)

    def __str__(self):
        return "%s" % self.name


class Participant(BaseModel):
    rooms = models.ManyToManyField(
        ChatRoom, related_name="participants",
        related_query_name="participant"
    )
    user = models.ForeignKey(USER, on_delete=models.CASCADE, related_name="participants",
                             related_query_name="participant")

    def __str__(self):
        return "%s : %s" % (self.rooms.all(), self.user.username)


class Message(BaseModel):
    text = models.TextField(blank=True, null=True)
    sender = models.ForeignKey(
        Participant,
        on_delete=models.CASCADE,
        related_name="sent_messages",
        related_query_name="sent_message",
    )
    room = models.ForeignKey(
        ChatRoom,
        on_delete=models.CASCADE,
        related_name="messages",
        related_query_name="message",
    )

    def __str__(self):
        return "%s : %s" % (self.sender, self.room)
