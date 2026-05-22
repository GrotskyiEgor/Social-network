from django.urls import path
from .views import *

urlpatterns = [
    path(route='chat', view = ChatView.as_view(template_name = 'chat_app/chat.html'), name="chat"),
]