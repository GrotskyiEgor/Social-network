from django.shortcuts import render, redirect
from django.http import HttpRequest, JsonResponse
from django.views.generic import TemplateView, ListView, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.db.models import Prefetch
from django.template.loader import render_to_string

from .forms import ProfileForm
from post_app.forms import PostForm, TagForm
from user_app.models import User
from post_app.models import Post
from chat_app.models import Chat, Message
from profile_app.models import Profile, Friendship
from post_app.views import unionTagList

from profile_app.services.freind_qureist import get_friends, get_friendship_recommendation, get_friendship_requests

def del_chat():
    chats_list = [36, 37, 38, 39, 40, 41, 42, 43, 44, 45]

    for chat_id in chats_list:
        chat = Chat.objects.get(id=chat_id)
        if chat:
            chat.delete()

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

        # context['requests'] = get_friendship_requests(self.request.user.profile)[:3]
        context['tags'] = unionTagList(self.request.user.profile)

        for post in context['posts']:
            post.toggleInteract('views', self.request.user.profile)

        # del_chat()
        
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
            posts = context['posts']

            for post in posts:
                post.toggleInteract('views', self.request.user.profile)
            
            return JsonResponse({
                'posts_html': render_to_string(
                    'post_app/download_parts/post_list.html',
                    {"posts": posts}      
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
    
class HomeLoaderView(LoginRequiredMixin, View):
    def get(self, context, **response_kwargs):
        selection = self.request.GET.get('selection', 0)

        if selection == 'requests':
            return JsonResponse({
                'chats_html': render_to_string(
                    'home_app/particals/requests.html',
                    {"requests": get_friendship_requests(self.request.user.profile)[:3], 'user_profile': self.request.user.profile}      
                )
            })
        elif selection == 'chats':
            messages_prefetch = Prefetch('messages',queryset=Message.objects.order_by('-created_at'))
            chats = Chat.objects.filter(users=self.request.user.profile, is_group = False).prefetch_related(messages_prefetch).order_by("id")[:3]
            print('chats', chats)
            return JsonResponse({
                'chats_html': render_to_string(
                    'home_app/particals/chats.html',
                    {"chats": chats, 'user_profile': self.request.user.profile}      
                )
            })
    
        return super().render_to_response(context, **response_kwargs)