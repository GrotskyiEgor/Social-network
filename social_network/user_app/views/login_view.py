from django.http import JsonResponse
from django.shortcuts import redirect
from django.contrib.auth import login, logout
from django.contrib.auth.views import LoginView, LogoutView

from ..forms.login_form import LoginForm


class LoginPageView(LoginView):
    form_class = LoginForm

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            login(request, form.user)
            return JsonResponse({'success': True})
        
        return JsonResponse({'success': False}, status=400)
        

class LogoutView(LogoutView):
    def post(self, request, *args, **kwargs):
        logout(request)
        return redirect('home')