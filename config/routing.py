from django.urls import path
from channels.routing import ProtocolTypeRouter, URLRouter
from .token_auth import TokenAuthMiddlewareStack
import chat.routing

application = ProtocolTypeRouter(
    {
        "websocket": TokenAuthMiddlewareStack(
            URLRouter(chat.routing.websocket_urlpatterns)
        )
    }
)
