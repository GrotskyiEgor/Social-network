from django.shortcuts import render, redirect
from django.urls import reverse
from django.http import HttpRequest, JsonResponse
from django.views.generic import TemplateView, ListView
from django.template.loader import render_to_string

from .forms import ProfileForm
from post_app.forms import PostForm, TagForm
from user_app.models import User
from post_app.models import Post
from post_app.views import unionTagList
from profile_app.models import Profile


class HomeView(ListView):
    model = Post
    paginate_by = 5
    context_object_name = 'posts'
    template_name = 'home_app/home.html'
    form_class = ProfileForm

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
        context['tag_form'] = TagForm()
        context['post_form'] = PostForm()

        context['tags'] = unionTagList(self.request.user)
        
        return context
    
    def post(self, request: HttpRequest, *args, **kwargs):
        form = self.form_class(request.POST)
        
        if form.is_valid():
            user_data = form.cleaned_data
            user = User.objects.filter(email=request.session.get('first_registration')).first()
            
            if user:    
                user.username = user_data['username']
                user.save()

                profile = Profile.objects.create(
                    user = user,
                    pseudonym = user_data['user_handle']  
                )
                
                request.session.pop('first_registration', None)

                # return redirect('home')

                return JsonResponse({
                    'success': True,
                    'username': user.username,
                    'pseudonym': profile.pseudonym,
                })
            
        return JsonResponse({  
            'success': False, 
            'error': form.errors
        }, status=400)
        

    def render_to_response(self, context, **response_kwargs):
        if self.request.headers.get("X-Requested-With") == "XMLHttpRequest": 
            page_obj = context['page_obj']
            
            return JsonResponse({
                'posts_html': render_to_string(
                    'post_app/download_parts/post_list.html',
                    {"posts": context['posts']}      
                ),
                'has_next': page_obj.has_next()
            })
            
        return super().render_to_response(context, **response_kwargs)
    
    def get_queryset(self):   
        return (
            Post.objects.select_related('author').
            prefetch_related('tags', 'links', 'images').
            order_by('-id')
        )