from django.urls import path
from .views import *
ChatMessageWithImages
urlpatterns = [
    path(route='chat', view = ChatView.as_view(template_name = 'chat_app/chat.html'), name="chat"),
    path('chat_with/<int:user_id>/', ChatWithView.as_view(), name="chat_with"),
    path('create_group/', CreateGroupView.as_view(), name="create_group"),
    path('upload_images/<int:chat_id>/', ChatMessageWithImages.as_view(), name='upload_image')
]