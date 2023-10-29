from channels.auth import AuthMiddlewareStack
from graphql_jwt.utils import jwt_decode
from django.contrib.auth.models import AnonymousUser
from .models import User
from asgiref.sync import sync_to_async
from channels.middleware import BaseMiddleware


class TokenAuthMiddleware(BaseMiddleware):
    """
    Token authorization middleware for Django Channels 2
    """

    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        headers = dict(scope['headers'])
        token = "NOTOKEN"
        for item in headers[b'cookie'].split():
            keyValue = str(item).split("=")
            if keyValue[0] == "b'token":
                token = keyValue[1][:-1]
                break

        if token == "NOTOKEN":
            raise Exception("Authentication error")
        else:
            username = jwt_decode(token)['username']
            scope['user'] = await sync_to_async(User.objects.get)(username=username)
        
        return await super().__call__(scope, receive, send)


def TokenAuthMiddlewareStack(inner): return TokenAuthMiddleware(
    AuthMiddlewareStack(inner))
