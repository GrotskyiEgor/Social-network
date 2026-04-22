import json

from django.contrib.auth import authenticate, login
from django.http import JsonResponse
from django.contrib.auth import logout
from django.contrib.auth.views import LogoutView
from django.shortcuts import render
from django.urls import reverse_lazy
from django.views.generic import CreateView
from django.contrib.auth.views import LoginView
from django.views.generic import TemplateView
# from django.contrib.auth.forms import UserCreationForm

from .models import User
from .forms import RegistrationForm, LoginForm, ConfirmEmail


class AuthView(TemplateView):
    template_name = 'user_app/auth.html'
    
    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['confirm_email_form'] = ConfirmEmail()
        context['registration_form'] = RegistrationForm()
        context['login_form'] = LoginForm()
        
        return context


class RegistrationView(CreateView):
    model = User
    form_class = RegistrationForm
    success_url = reverse_lazy('home')

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            user = form.save()
            return JsonResponse({'success': True})
        
        return JsonResponse({'success': False}, status=400)


class LoginPageView(LoginView):
    form_class = LoginForm
    # template_name = 'user_app/login.html'

    def post(self, request, *args, **kwargs):
        email = request.POST.get('email')
        password = request.POST.get('password')

        user = authenticate(request, username=email, password=password)

        if user is not None and user.email_verified:     
            login(request, user)

        return JsonResponse({
            'success': True, 
            'redirect_url': '/'
        })
        

    
class LogoutView(LogoutView):
    def post(self, request, *args, **kwargs):
        logout(request)

        if request.content_type == 'application/json':
            return JsonResponse({
                'success': True, 
                'redirect_url': '/'
            })
        
        return super().post(request, *args, **kwargs)


            

