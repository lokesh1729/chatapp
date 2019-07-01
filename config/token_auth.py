from channels.auth import AuthMiddlewareStack
from django.contrib.auth.models import AnonymousUser
from knox.models import AuthToken
from knox.settings import CONSTANTS
from django.http.cookie import parse_cookie


class TokenAuthMiddleware:
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, inner):
        self.inner = inner

    def __call__(self, scope):
        try:
            headers = dict(scope["headers"])
            cookies = headers[b"cookie"]
            cookie_dict = parse_cookie(cookies.decode('utf-8'))
            auth_token = cookie_dict["authToken"]
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
