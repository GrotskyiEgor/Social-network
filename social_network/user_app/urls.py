from django.urls import path
from .views import RegistrationView, LoginPageView, AuthView

urlpatterns = [
    path(route = 'auth/', view = AuthView.as_view(), name='auth'),
]
