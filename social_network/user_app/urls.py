from django.urls import path
from .views import RegistrationView, LoginPageView

urlpatterns = [
    path(route = 'registration/', view = RegistrationView.as_view(), name='registration'),
    path(route = 'login/', view = LoginPageView.as_view(), name='login'),
]
