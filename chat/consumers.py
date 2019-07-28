from channels.generic.websocket import WebsocketConsumer, AsyncJsonWebsocketConsumer
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async

from chat import constants
from chat.models import ChatRoom, Participant, Message
from asgiref.sync import async_to_sync
from django.utils import timezone
import json

USER = get_user_model()


class ChatConsumer(WebsocketConsumer):
    def __init__(self, *args, **kwargs):
        self.user = None
        self.room = None
        self.room_group_name = None
        super(ChatConsumer, self).__init__(*args, **kwargs)

    def connect(self):
        try:
            self.user = self.scope["user"]
            print("logged in user: %s" % self.user)
            if isinstance(self.user, AnonymousUser):
                return self.disconnect(1002)
            room_name = self.scope["url_route"]["kwargs"]["room_name"]
            self.room_group_name = "chat_%s" % room_name
            self.room, _ = ChatRoom.objects.get_or_create(name=room_name)

            # Join room group
            async_to_sync(self.channel_layer.group_add)(
                self.room_group_name, self.channel_name
            )

            self.accept()
            self.send(
                text_data=json.dumps(
                    {
                        "type": "INITIAL_STATUS",
                        "data": [
                            {
                                "last_seen": user.last_seen.strftime(
                                    "%Y-%m-%dT%H:%M:%S %Z"
                                ),
                                "username": user.username,
                                "status": constants.ONLINE,
                            }
                            for user in self.room.online_users.exclude(
                                username=self.user.username
                            ).all()
                        ],
                    }
                )
            )

            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    "type": "send_status",
                    "status": constants.ONLINE,
                    "username": self.user.username,
                    "last_seen": timezone.now().strftime("%Y-%m-%dT%H:%M:%S %Z"),
                },
            )
        except Exception:
            import traceback

            traceback.print_exc()

    def disconnect(self, code):
        print("disconnect code %s" % code)
        async_to_sync(self.channel_layer.group_discard)(
            self.room_group_name, self.channel_name
        )
        async_to_sync(self.channel_layer.group_send)(
            self.room_group_name,
            {
                "type": "send_status",
                "status": constants.OFFLINE,
                "username": self.user.username,
                "last_seen": timezone.now().strftime("%Y-%m-%dT%H:%M:%S %Z"),
            },
        )
        self.user.last_seen = timezone.now()
        self.user.save()

    def receive(self, text_data=None, bytes_data=None):
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json["message"]
            try:
                participant = Participant.objects.get(rooms=self.room, user=self.user)
            except Participant.DoesNotExist:
                participant = Participant.objects.create(user=self.user)
                participant.save()
                participant.rooms.add(self.room)
            except Participant.MultipleObjectsReturned:
                participants = Participant.objects.filter(
                    rooms=self.room, user=self.user
                )
                participant = participants.latest("pk")
                total_participants = Participant.objects.count()
                to_be_deleted = Participant.objects.all()[: total_participants - 1]
                to_be_deleted = to_be_deleted.values_list("pk", flat=True)
                Participant.objects.filter(pk__in=to_be_deleted).delete()
            obj = Message.objects.create(
                text=message, room=self.room, sender=participant
            )
            async_to_sync(self.channel_layer.group_send)(
                self.room_group_name,
                {
                    "type": "send_message",
                    "message": message,
                    "key": obj.id,
                    "user": self.user.username,
                },
            )
        except Exception:
            import traceback

            traceback.print_exc()

    def send_message(self, event):
        self.send(
            text_data=json.dumps(
                {
                    "type": "MESSAGE",
                    "data": {
                        "message": event["message"],
                        "key": event["key"],
                        "username": event["user"],
                    },
                }
            )
        )

    def send_status(self, event):
        try:
            if event["status"] == constants.ONLINE:
                self.room.online_users.add(USER.objects.get(username=event["username"]))
            elif event["status"] == constants.OFFLINE:
                self.room.online_users.remove(
                    USER.objects.get(username=event["username"])
                )
            self.send(
                text_data=json.dumps(
                    {
                        "type": event["status"],
                        "data": {
                            "last_seen": event["last_seen"],
                            "username": event["username"],
                        },
                    }
                )
            )
        except Exception:
            import traceback

            traceback.print_exc()


class P2PConsumer(AsyncJsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        self.user = None
        self.room_name = None
        super(P2PConsumer, self).__init__(*args, **kwargs)

    async def connect(self):
        try:
            self.user = self.scope["user"]
            print("logged in user: %s" % self.user)
            if isinstance(self.user, AnonymousUser):
                return self.disconnect(1002)
            peer_name = self.scope["url_route"]["kwargs"]["peer_name"]
            self.room_name = "peer_%s" % peer_name

            # Join room group
            await self.channel_layer.group_add(
                self.room_name, self.channel_name
            )

            await self.accept()

            await self.channel_layer.group_send(
                self.room_name,
                {
                    "type": "send_status",
                    "status": constants.ONLINE,
                    "username": self.user.username,
                    "last_seen": timezone.now().strftime("%Y-%m-%dT%H:%M:%S %Z"),
                },
            )
        except Exception:
            import traceback

            traceback.print_exc()

    async def disconnect(self, code):
        print("disconnect code %s" % code)
        await self.channel_layer.group_discard(
            self.room_name, self.channel_name
        )
        await self.channel_layer.group_send(
            self.room_name,
            {
                "type": "send_status",
                "status": constants.OFFLINE,
                "username": self.user.username,
                "last_seen": timezone.now().strftime("%Y-%m-%dT%H:%M:%S %Z"),
            },
        )
        self.user.last_seen = timezone.now()
        self.user.save()

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json["message"]
            obj = await self.get_message_obj(message)
            await self.channel_layer.group_send(
                self.room_name,
                {
                    "type": "send_message",
                    "from": self.user.username,
                    "to": text_data_json["to"],
                    "message": message,
                    "key": obj.id,
                },
            )
        except Exception:
            import traceback

            traceback.print_exc()

    @database_sync_to_async
    def get_message_obj(self, message):
        room, _ = ChatRoom.objects.get_or_create(self.room_name)
        room.online_users.add(self.user)
        participant, _ = Participant.objects.get_or_create(sender=self.user)
        obj = Message.objects.create(text=message, room=room, sender=participant)
        return obj

    async def send_message(self, event):
        await self.send(
            text_data=json.dumps(
                {
                    "type": "MESSAGE",
                    "data": {
                        "message": event["message"],
                        "key": event["key"],
                        "from": event["from"],
                        "to": event["to"]
                    },
                }
            )
        )

    async def send_status(self, event):
        try:
            await self.send(
                text_data=json.dumps(
                    {
                        "type": event["status"],
                        "data": {
                            "last_seen": event["last_seen"],
                            "username": event["username"],
                        },
                    }
                )
            )
        except Exception:
            import traceback

            traceback.print_exc()
