from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response

from .serializers import MessageSerializer
from .models import Message
from rest_framework.permissions import IsAuthenticated


class MessageViewset(viewsets.ModelViewSet):
    serializer_class = MessageSerializer
    queryset = Message.objects.all()
    permission_classes = (IsAuthenticated,)

    @action(
        methods=["GET", "PUT", "POST", "DELETE"],
        detail=False,
        url_name="room-messages",
        url_path="room/(" "?P<room_name>[" "a-zA-Z]+)",
    )
    def room(self, request, room_name):
        if request.method == "GET":
            queryset = Message.objects.filter(room=room_name)
            response = self.get_serializer(
                instance=queryset, context={"request": request}, many=True
            )
            return Response(response.data, status=status.HTTP_200_OK)
        elif request.method == "POST":
            serializer = self.get_serializer(data=request.data)
            serializer.is_valid(raise_exception=True)
            instance = serializer.create(serializer.validated_data)
            serializer = self.get_serializer_class()
            response = serializer(
                instance
            )
            return Response(response.data, status=status.HTTP_200_OK)
