from django.contrib.auth import get_user_model
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse
from rest_framework import generics
from rest_framework import status
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from knox.models import AuthToken
from django.contrib.auth.signals import user_logged_in
from django.utils import timezone
from knox import views as knox_views
from django.views.generic import DetailView, ListView, RedirectView, UpdateView

from chatapp.users.serializers import (
    RegisterSerializer,
    UserSerializer,
    LoginSerializer,
)

User = get_user_model()


class UserDetailView(LoginRequiredMixin, DetailView):

    model = User
    slug_field = "username"
    slug_url_kwarg = "username"


user_detail_view = UserDetailView.as_view()


class UserListView(LoginRequiredMixin, ListView):

    model = User
    slug_field = "username"
    slug_url_kwarg = "username"


user_list_view = UserListView.as_view()


class UserUpdateView(LoginRequiredMixin, UpdateView):

    model = User
    fields = ["name"]

    def get_success_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})

    def get_object(self, queryset=None):
        return User.objects.get(username=self.request.user.username)


user_update_view = UserUpdateView.as_view()


class UserRedirectView(LoginRequiredMixin, RedirectView):

    permanent = False

    def get_redirect_url(self):
        return reverse("users:detail", kwargs={"username": self.request.user.username})


user_redirect_view = UserRedirectView.as_view()


class AuthRegisterView(generics.CreateAPIView):
    serializer_class = RegisterSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        _, token = AuthToken.objects.create(user)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {"user": serializer.data, "token": token},
            status=status.HTTP_201_CREATED,
            headers=headers,
        )


class AuthLoginView(generics.GenericAPIView, knox_views.LoginView):
    serializer_class = LoginSerializer
    authentication_classes = ()
    permission_classes = ()

    def post(self, request, format=None):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        token_limit_per_user = self.get_token_limit_per_user()
        if token_limit_per_user is not None:
            now = timezone.now()
            token = user.auth_token_set.filter(expiry__gt=now)
            if token.count() >= token_limit_per_user:
                return Response(
                    {"error": "Maximum amount of tokens allowed per user exceeded."},
                    status=status.HTTP_403_FORBIDDEN,
                )
        token_ttl = self.get_token_ttl()
        instance, token = AuthToken.objects.create(user, token_ttl)
        user_logged_in.send(sender=user.__class__, request=request, user=user)
        user_serializer = self.get_user_serializer_class()
        data = {"expiry": instance.expiry, "token": token}
        if user_serializer is not None:
            data["user"] = user_serializer(user, context=self.get_context()).data
        return Response(data)


class AuthDetailsView(generics.RetrieveAPIView):
    serializer_class = UserSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self):
        return self.request.user
