from django.conf.urls import url

from . import consumers

websocket_urlpatterns = [
    url(r"^ws/chat/(?P<room_name>[^/]+)/$", consumers.ChatConsumer),
    url(r"^ws/p2p/(?P<peer_name>[^/]+)/$", consumers.P2PConsumer)
]
