from django import forms
from django.contrib.auth import authenticate


class LoginForm(forms.Form):
    email = forms.EmailField(
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

    def clean(self):
        cleaned_data = super().clean()

        email = cleaned_data.get('email')
        password = cleaned_data.get('password')
        user = authenticate(email=email, password=password)

        if not user:
            raise forms.ValidationError("Неверный email или пароль")
        
        self.user = user
        return cleaned_data
