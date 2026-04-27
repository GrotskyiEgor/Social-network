from django import forms

from user_app.models import User


class ModalForm(forms.Form):
    username = forms.CharField(
        max_length=20, 
        widget=forms.TextInput(
            attrs={
                'class': 'registration-input',
                'placeholder': 'Введіть Псевдонім автора'
            }
        )
    )

    user_handle = forms.CharField(
        max_length=30,
        widget=forms.TextInput(
            attrs={
                'class': 'registration-input',
                'placeholder': '@'
            }
        )
    )   

    def clean(cleaned_data):
        cleaned_data = super().clean()

        if User.objects.filter(user_handle=cleaned_data.get('user_handle')).exists():
            raise forms.ValidationError("Has username") 

        return cleaned_data