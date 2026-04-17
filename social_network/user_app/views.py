from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.views import LoginView
from .models import User
from .forms import RegistrationForm, LoginForm

class RegistrationView(CreateView):
    model = User
    form_class = RegistrationForm
    template_name = 'user_app/registration.html'
    success_url = reverse_lazy('home_app:home')

class LoginPageView(LoginView):
    form_class = LoginForm
    template_name = 'user_app/login.html'
