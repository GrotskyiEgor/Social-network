from django.urls import path
from .views import PostView, PostCreateView

urlpatterns = [
    path(route = '', view = PostView.as_view(template_name = 'post_app/post.html'), name = 'post'),
    path(route = 'creata_post', view = PostCreateView.as_view(), name = 'create_post'),
]