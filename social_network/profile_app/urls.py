from django.urls import path
from .views import *

urlpatterns = [
    path(route = '', view = ProfileView.as_view(template_name = 'profile_app/profile.html'), name="profile"),
    path(route = 'all_friends', view = AllFriendsView.as_view(template_name = 'friends_app/friends.html'), name="all_friends")
]