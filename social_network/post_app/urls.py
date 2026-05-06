from django.urls import path
from .views import PostView, PostCreateView, TagCreateView, PostDeleteView

urlpatterns = [
    path(route = '', view = PostView.as_view(template_name = 'post_app/post.html'), name = 'post'),
    path(route = 'creata_post', view = PostCreateView.as_view(), name = 'create_post'),
    path(route = 'create_tag', view = TagCreateView.as_view(), name = 'create_tag'),
    path(route = 'delete_post/<int:post_id>/', view = PostDeleteView.as_view(), name='delete_post')
]