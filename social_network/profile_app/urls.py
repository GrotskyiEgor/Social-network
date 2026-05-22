from django.urls import path
from .views import *

urlpatterns = [
    path(route = 'profile/<int:user_id>/<str:action>', view = ProfileView.as_view(template_name = 'profile_app/profile.html'), name="profile"),
    path(route = 'all_friends', view = AllFriendsView.as_view(template_name = 'friends_app/friends.html'), name="all_friends"),
    path(route = 'all_friends/<str:selection>', view = FriendsSelectionView.as_view(), name="all_friends_selection"),
    path(route = 'friends_action/<str:action>/<int:profile_id>', view = FriendsAction.as_view(), name="friends_action")
]