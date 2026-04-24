import json

from django.urls import reverse_lazy
from django.shortcuts import render, redirect
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.hashers import make_password
from django.http import JsonResponse
from django.views import View
from django.views.generic import CreateView, TemplateView
from django.contrib.auth.views import LoginView, LogoutView
# from django.contrib.auth.forms import UserCreationForm

from .models import User
from .forms import RegistrationForm, LoginForm, ConfirmEmail
from .send_email import send_email_code, generate_code


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
            user_data = form.cleaned_data

            code = generate_code()
            request.session['registration_email'] = user_data.get('email')
            request.session['registration_password'] = user_data.get('password1')
            request.session['confirm_code'] = code

            send_email_code('user@gmail.com', code)
            
            return JsonResponse({'success': True})
        
        return JsonResponse({'success': False}, status=400)
    

class ConfirmEmaiView(View):
    model = User
    form_class = ConfirmEmail
    
    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        
        if form.is_valid():
            confirm_data = form.cleaned_data
            
            registration_email = request.session.get('registration_email')
            registration_password = request.session['registration_password']
            confirm_code = request.session['confirm_code']

            # print("===========confirm==============")
            # print(registration_email, registration_password, confirm_code, confirm_data.get('confirm_code'))

            if confirm_data.get('confirm_code') == confirm_code:
                user = self.model(
                    email = registration_email,
                    password = make_password(registration_password)
                )

                user.save()

                return JsonResponse({'success': True})

        return JsonResponse({'success': False}, status=400)


class LoginPageView(LoginView):
    form_class = LoginForm

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            user_data = form.cleaned_data  
            user = authenticate(request, email=user_data.get("email"), password=user_data.get("password"))

            # print('==========login==============')
            # print(user, user_data.get("email"), user_data.get("password"))
            if user is not None:     
                login(request, user)

                return JsonResponse({'success': True})
        
        return JsonResponse({'success': False}, status=400)
        

class LogoutView(LogoutView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return redirect('home')
