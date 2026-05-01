from django.shortcuts import render, redirect
from django.http import HttpRequest, JsonResponse
from django.views.generic import TemplateView

from .forms import ModalForm
from user_app.models import User


class HomeView(TemplateView):
    template_name = 'home_app/home.html'
    form_class = ModalForm

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('auth')

        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        first_registration = self.request.session.get('first_registration')
        if first_registration != None and first_registration != '':
            first_registration = True

        context['first_registration'] = first_registration
        context['modal_form'] = self.form_class
        
        return context
    
    def post(self, request: HttpRequest, *args, **kwargs):
        form = self.form_class(request.POST)
        
        if form.is_valid():
            user_data = form.cleaned_data
            user = User.objects.filter(email=request.session.get('first_registration')).first()
            
            if user:    
                user.username = user_data['username']
                user.user_handle = user_data['user_handle']     
                user.save()
                
                request.session.pop('first_registration', None)

                return redirect('home')
            
        return JsonResponse({  
            'success': False, 
            'error': {
                'wrong_username': ['Такий username вже зайнятий']
            }
        }, status=400)
        