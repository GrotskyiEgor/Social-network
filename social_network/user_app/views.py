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
from django.contrib.auth.forms import UserCreationForm
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


class RegistrationView(UserCreationForm):
    model = User
    form_class = RegistrationForm
    # template_name = 'user_app/registration.html'
    success_url = reverse_lazy('home')

    def form_valid(self, form):
        print("user = form.save()")
        # user = form.save()


class LoginPageView(LoginView):
    form_class = LoginForm
    # template_name = 'user_app/login.html'

    def post(self, request, *args, **kwargs):
        if request.content_type == 'application/json':
            try:
                data = json.loads(request.body)
                username = data.get('username')
                password = data.get('password')

                user = authenticate(request, username=username, password=password)

                if user is not None:     
                    login(request, user)

                    return JsonResponse({
                        'success': True, 
                        'redirect_url': '/'
                    })
                
            except Exception as error:
                pass

    
class LogoutView(LogoutView):
    def post(self, request, *args, **kwargs):
        logout(request)

        if request.content_type == 'application/json':
            return JsonResponse({
                'success': True, 
                'redirect_url': '/'
            })
        
        return super().post(request, *args, **kwargs)


            

