from django.urls import reverse_lazy
from django.http import JsonResponse
from django.views.generic import CreateView
from ..forms.registration_form import RegistrationForm

from ..models import User
from ..services.auth_service import start_registration


class RegistrationView(CreateView):
    model = User
    form_class = RegistrationForm
    success_url = reverse_lazy('home')

    def post(self, request, *args, **kwargs):
        form = self.form_class(request.POST)

        if form.is_valid():
            start_registration(request=request, cleaned_data=form.cleaned_data)
            return JsonResponse({'success': True})
        
        return JsonResponse({'success': False}, status=400)