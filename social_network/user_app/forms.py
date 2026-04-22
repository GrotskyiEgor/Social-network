from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.forms import AuthenticationForm
from .models import User

class ConfirmEmail(forms.Form):
    confirm_code = forms.CharField(max_length=6, widget=forms.EmailInput)

class RegistrationForm(UserCreationForm):
    class Meta:
        model = User
        fields = ('email',)


class LoginForm(AuthenticationForm):
    email = forms.CharField(
        widget=forms.EmailInput(
             attrs={
                'class': 'registration-input',
                'placeholder': 'you@example.com'
            }
        )
    )
    password = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'class': 'registration-input',
                'placeholder': 'Введи пароль'
            }
        )
    )
    
