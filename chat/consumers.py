from channels.generic.websocket import WebsocketConsumer
from django.contrib.auth.models import AnonymousUser

from chat.models import ChatRoom, Participant, Message
from asgiref.sync import async_to_sync
import json


class ChatConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        self.user = None
        super(ChatConsumer, self).__init__(*args, **kwargs)

    def connect(self):
        self.user = self.scope["user"]
        print("logged in user: %s" % self.user)
        if isinstance(self.user, AnonymousUser):
            return self.disconnect(1002)
        self.room_name = self.scope['url_route']['kwargs']['room_name']
        self.room_group_name = 'chat_%s' % self.room_name

        # Join room group
        async_to_sync(self.channel_layer.group_add)(
            self.room_group_name,
            self.channel_name
        )

        self.accept()

    def disconnect(self, code):
        print("disconnect code %s" % code)
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name,
            self.channel_name
        )

    def receive(self, text_data=None, bytes_data=None):
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json["message"]
            room_name = text_data_json["room_name"]
            room, _ = ChatRoom.objects.get_or_create(name=room_name)
            try:
                participant = Participant.objects.get(rooms=room, user=self.user)
            except Participant.DoesNotExist:
                participant = Participant.objects.create(user=self.user)
                participant.save()
                participant.rooms.set([room])
            except Participant.MultipleObjectsReturned:
                participants = Participant.objects.filter(rooms=room, user=self.user)
                participant = participants.latest('pk')
                total_participants = Participant.objects.count()
                to_be_deleted = Participant.objects.all()[:total_participants-1]
                to_be_deleted = to_be_deleted.values_list("pk", flat=True)
                Participant.objects.filter(pk__in=to_be_deleted).delete()
            obj = Message.objects.create(text=message, room=room, sender=participant)
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    'type': 'send_message',
                    'message': message,
                    'key': obj.id,
                    'user': self.user.username
                }
            )
        except Exception:
            import traceback

            traceback.print_exc()

    def send_message(self, event):
        self.send(
            text_data=json.dumps(
                {
                    "message": event["message"],
                    "key": event['key'],
                    "username": event['user'],
                }
            )
        )
