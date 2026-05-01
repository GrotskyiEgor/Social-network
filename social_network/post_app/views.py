from django.shortcuts import render
from django .views.generic import TemplateView, View
from django.urls import reverse_lazy
from django.http import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import PostForm


class PostView(LoginRequiredMixin, TemplateView):
    template_name = 'post_app/post.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['post_form'] = PostForm()

        return context

   
class PostCreateView(View):
    #success_url = ...
    login_url = reverse_lazy('register_login_page')

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs() 

        if self.request.method == "POST":
            kwargs['links'] = self.request.POST.getlist('links')

        return kwargs
    
    def form_valid(self, form):
        post = form.save(author = self.request.user)

        return JsonResponse({
            'success': True,
            'message': 'Публікація успішно створена'
        })
    
    def form_invalid(self, form):
        return JsonResponse({
            'success': False,
            'message': 'Публікація не була створена'
        })