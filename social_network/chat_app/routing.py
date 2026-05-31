from django.urls import path
from .consumers import ChatConsumer


websocket_urlpatterns = [
    path('chat_chanel/<int:chat_id>/', ChatConsumer.as_asgi())
]