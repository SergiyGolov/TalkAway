from django.urls import path

from . import consumers

# websocket_urlpatterns = [
    # re_path(r'^ws$', consumers.ChatConsumer),
# ]

websocket_urlpatterns = [
    path('ws', consumers.ChatConsumer.as_asgi()),
]