from django import forms

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
    name = forms.CharField(
        max_length=30,
        widget=forms.TextInput(
            attrs={
                'class': 'registration-input',
                'placeholder': '@'
            }
        )
    )