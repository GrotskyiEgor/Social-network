from django.shortcuts import render
from django.views.generic import TemplateView
from .forms import ModalForm

# Create your views here.
class HomeView(TemplateView):
    template_name = 'home_app/home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['modal_form'] = ModalForm
        
        return context
    