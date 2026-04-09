from django.urls import path
from .views import HomeView

urlpatterns = [
    path(route = '', view = HomeView.as_view(template_name = 'home_app/home.html'), name="home"),
]