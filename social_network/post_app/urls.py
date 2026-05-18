from django.urls import path
from .views import PostView, PostCreateView, TagCreateView, PostDeleteView, PostInteractView

urlpatterns = [
    path(route='', view=PostView.as_view(template_name='post_app/post.html'), name='post'),
    path(route='create_tag', view=TagCreateView.as_view(), name='create_tag'),
    path(route='creata_post', view=PostCreateView.as_view(), name='create_post'),
    path(route='interact_post/<str:interact_post>/<int:post_id>/', view=PostInteractView.as_view(), name='interact_post'),
    path(route='delete_post/<int:post_id>/', view=PostDeleteView.as_view(), name='delete_post')
]