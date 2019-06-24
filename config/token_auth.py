from channels.auth import AuthMiddlewareStack
from django.contrib.auth.models import AnonymousUser
from rest_framework import exceptions
from knox.models import AuthToken
from knox.settings import CONSTANTS
from django.conf import settings


class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        try:
            headers = dict(scope["headers"])
            if headers.get(b"sec-websocket-protocol"):
                token_name, auth_token = (
                    headers[b"sec-websocket-protocol"].decode().split(",")
                )
                token_prefix = "Token"
                auth_token = auth_token.strip()
                if settings.REST_KNOX.get("AUTH_HEADER_PREFIX"):
                    token_prefix = settings.REST_KNOX["AUTH_HEADER_PREFIX"]
                if token_name == "Token":
                    token_obj = AuthToken.objects.filter(
                        token_key=auth_token[: CONSTANTS.TOKEN_KEY_LENGTH]
                    )
                    if token_obj.exists() and token_obj.latest("pk").user.is_active:
                        scope["user"] = token_obj.latest("pk").user
                        return self.inner(scope)
                scope["user"] = AnonymousUser()
            return self.inner(scope)
        except Exception:
            import traceback

            traceback.print_exc()


TokenAuthMiddlewareStack = lambda inner: TokenAuthMiddleware(AuthMiddlewareStack(inner))
