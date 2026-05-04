from django.urls import path
from .views import ProfileView

urlpatterns = [
    path(route = '', view = ProfileView.as_view(template_name = 'profile_app/profile.html'), name="profile"),
]