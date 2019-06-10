from channels.auth import AuthMiddlewareStack
from django.contrib.auth.models import AnonymousUser
from rest_framework import exceptions
from knox.models import AuthToken
from knox.settings import CONSTANTS


class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        import ipdb

        ipdb.set_trace()
        headers = dict(scope["headers"])
        if b"authorization" in headers:
            token_name, auth_token = headers[b"authorization"].decode().split()
            if token_name == "Token":
                token_exists = AuthToken.objects.filter(
                    token_key=auth_token[: CONSTANTS.TOKEN_KEY_LENGTH]
                ).exists()
                if token_exists and auth_token.user.is_active:
                    scope["user"] = auth_token.user
            scope["user"] = AnonymousUser()
        return self.inner(scope)


TokenAuthMiddlewareStack = lambda inner: TokenAuthMiddleware(AuthMiddlewareStack(inner))
