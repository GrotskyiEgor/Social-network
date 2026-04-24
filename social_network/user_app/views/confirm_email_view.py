from django.views import View
from django.http import JsonResponse
from ..forms.confirm_email_form import ConfirmEmail

from ..models import User
from ..services.auth_service import confirm_email


class ConfirmEmaiView(View):
    model = User
    form_class = ConfirmEmail
    
    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)
        
        if form.is_valid():
            user = confirm_email(request=request, cleaned_data=form.cleaned_data)

            if not user:
                return JsonResponse({
                    'success': False, 
                    'error': {
                        'confirm_code': ['Неверный код']
                    }
                }, status=400)

            return JsonResponse({'success': True})

        return JsonResponse({'success': False, 'error': form.errors}, status=400)