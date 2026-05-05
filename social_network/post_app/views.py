from django.shortcuts import render
from django .views.generic import TemplateView, View
from django.urls import reverse_lazy
from django.http import JsonResponse
from django.contrib.auth.mixins import LoginRequiredMixin

from .forms import PostForm, TagForm
from .models import Tag, Post


class PostView(LoginRequiredMixin, TemplateView):
    template_name = 'post_app/post.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['tag_form'] = TagForm()
        context['post_form'] = PostForm()
        context['tags'] = Tag.objects.all()
        context['posts'] = Post.objects.filter(author=self.request.user).all()
        
        return context


class TagCreateView(View):
    #success_url = ...
    login_url = reverse_lazy('register_login_page')

    def post(self, request, *args, **kwargs):
        form = TagForm(request.POST)

        if form.is_valid():
            tag = form.save()

            return JsonResponse({
                'success': True,
                'message': 'Публікація успішно створена'
            })
    
        return JsonResponse({
            'success': False,
            'message': 'Публікація не була створена'
        })


class PostCreateView(View):
    #success_url = ...
    login_url = reverse_lazy('register_login_page')

    def get_form_kwargs(self):
        kwargs = super().get_form_kwargs() 

        if self.request.method == "POST":
            kwargs['links'] = self.request.POST.getlist('links')
            kwargs['images'] = self.request.FILES.getlist('images')

        return kwargs
    
    def post(self, request, *args, **kwargs):
        form = PostForm(
            request.POST, 
            request.FILES,
            self.request.POST.getlist('links')
        )

        if form.is_valid():
            post = form.save(author=self.request.user)

            return JsonResponse({
                'success': True,
                'message': 'Публікація успішно створена'
            })
    
        return JsonResponse({
            'success': False,
            'message': 'Публікація не була створена'
        })
    
