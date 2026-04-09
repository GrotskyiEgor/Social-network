from django.urls import path
from .views import FriendsView

urlpatterns = [
    path(route = '', view = FriendsView.as_view(template_name = 'friends_app/friends.html'), name="friends"),
]