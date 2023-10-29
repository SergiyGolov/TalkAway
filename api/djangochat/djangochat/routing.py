
from channels.routing import ProtocolTypeRouter, URLRouter
import os
from django.core.asgi import get_asgi_application
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'djangochat.settings')
import django
django.setup()
import api.routing
from api.token_auth import TokenAuthMiddlewareStack

ASGI_APPLICATION = "api.routing.application"

application = ProtocolTypeRouter({
    'websocket': TokenAuthMiddlewareStack(
        URLRouter(
            api.routing.websocket_urlpatterns
        )
    ),
    'http':get_asgi_application()
})
