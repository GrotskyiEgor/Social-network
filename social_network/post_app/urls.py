from django.urls import path
from .views import PostView, PostCreateView, TagCreateView

urlpatterns = [
    path(route = '', view = PostView.as_view(template_name = 'post_app/post.html'), name = 'post'),
    path(route = 'creata_post', view = PostCreateView.as_view(), name = 'create_post'),
    path(route = 'create_tag', view = TagCreateView.as_view(), name = 'create_tag'),
]