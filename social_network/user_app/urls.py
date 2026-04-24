from django.urls import path
from .views import *

urlpatterns = [
    path(route = 'auth/', view = AuthView.as_view(), name='auth'),
    # path(route = 'send_email/', view = SendEmaiView.as_view(), name='send_email'),
    path(route = 'confirm_email/', view = ConfirmEmaiView.as_view(), name='confirm_email'),
    path(route = 'registration/', view = RegistrationView.as_view(), name='registration'),
    path(route = 'login/', view = LoginPageView.as_view(), name='login'),
    path(route = 'logout/', view = LogoutView.as_view(), name='logout'),
]

