from channels.generic.websocket import WebsocketConsumer
import json
import uuid


class ChatConsumer(WebsocketConsumer):
    def connect(self):
        self.user = self.scope["user"]
        print(self.user)
        self.accept()

    def disconnect(self, code):
        print("disconnect code %s" % code)

    def receive(self, text_data=None, bytes_data=None):
        try:
            text_data_json = json.loads(text_data)
            message = text_data_json["message"]
            self.send(
                text_data=json.dumps(
                    {
                        "message": message,
                        "key": str(uuid.uuid4()),
                        "username": self.user.username,
                    }
                )
            )
        except Exception:
            import traceback

            traceback.print_exc()
