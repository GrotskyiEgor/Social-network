from django.template.loader import render_to_string
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

        user_tags = Tag.objects.filter(author=self.request.user).order_by('-id')[:5]
        tag_list = list(Tag.objects.order_by('id')) + list(user_tags)
        # user_posts = Post.objects.filter(author=self.request.user).order_by('-create_at')[:2]
        # post_tags = Tag.objects.filter(posts__in=user_posts).distinct()
        # tag_list = list(Tag.objects.all()[:10]) + list(post_tags) + list(user_tags)

        context['tag_form'] = TagForm()
        context['post_form'] = PostForm()

        context['tags'] = tag_list
        context['posts'] = Post.objects.filter(author=self.request.user).order_by('-create_at')
        
        return context


class TagCreateView(View):
    login_url = reverse_lazy('register_login_page')

    def post(self, request, *args, **kwargs):
        form = TagForm(request.POST)

        if form.is_valid():
            tag = form.save(author=self.request.user)

            return JsonResponse({
                'success': True,
                'message': 'Публікація успішно створена',
                'tag_html': render_to_string('post_app/post_form_tag.html', context={'tag': tag})
            })
    
        return JsonResponse({
            'success': False,
            'message': 'Публікація не була створена'
        })


class PostCreateView(View):
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
            links=self.request.POST.getlist('links'),
            images=request.FILES.getlist('images')
        )

        if form.is_valid():
            post = form.save(author=self.request.user)

            return JsonResponse({
                'success': True,
                'message': 'Публікація успішно створена',
                'post_html': render_to_string('post_app/post_list.html', context={"posts": [post]})
            })
    
        return JsonResponse({
            'success': False,
            'message': 'Публікація не була створена'
        })


class PostDeleteView(View):
    def post(self, request, post_id):
        post = Post.objects.get(id=post_id, author=request.user)
        post.delete()

        return JsonResponse({'success': True})
