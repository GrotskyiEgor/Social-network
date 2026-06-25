from django.urls import path
from .consumers import OnlineStatusConsumer, UnreadConsumer
from chat_app.consumers import ChatConsumer


websocket_urlpatterns = [
    path('chat/online/', OnlineStatusConsumer.as_asgi()),
    path('chat_chanel/<int:chat_id>/', ChatConsumer.as_asgi()),
    path('chat/unread/', UnreadConsumer.as_asgi()),
]