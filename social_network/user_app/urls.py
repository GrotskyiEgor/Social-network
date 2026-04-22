from django.urls import path
from .views import RegistrationView, LoginPageView, AuthView, LogoutView

urlpatterns = [
    path(route = 'auth/', view = AuthView.as_view(), name='auth'),
    path(route = 'registraction/', view = RegistrationView, name='registraction'),
    path(route = 'login/', view = LoginPageView.as_view(), name='login'),
    path(route = 'logout/', view = LogoutView.as_view(), name='logout'),
]

