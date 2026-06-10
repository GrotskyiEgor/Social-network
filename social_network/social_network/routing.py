from django.urls import path
from .consumers import ActiveConsumer
from chat_app.consumers import ChatConsumer


websocket_urlpatterns = [
    path('is_active/<int:profile_id>/', ActiveConsumer.as_asgi()),
    path('chat_chanel/<int:chat_id>/', ChatConsumer.as_asgi())
]