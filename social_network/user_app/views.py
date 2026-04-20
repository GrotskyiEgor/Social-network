from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.views import LoginView
from django.views.generic import TemplateView
from .models import User
from .forms import RegistrationForm, LoginForm, ConfirmEmail

class AuthView(TemplateView):
    template_name = 'user_app/auth.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['confirm_email_form'] = ConfirmEmail
        context['registration_form'] = RegistrationForm
        context['login_form'] = LoginForm
        
        return context



class RegistrationView(CreateView):
    model = User
    form_class = RegistrationForm
    template_name = 'user_app/registration.html'
    success_url = reverse_lazy('home_app:home')

class LoginPageView(LoginView):
    form_class = LoginForm
    template_name = 'user_app/login.html'
