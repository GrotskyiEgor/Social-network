from django import forms


class ConfirmEmail(forms.Form):
    confirm_code = forms.CharField(max_length=6)

    def clean(self):
        cleaned_data =  super().clean()
