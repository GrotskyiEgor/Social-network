from django.shortcuts import render, redirect
from django.views.generic import TemplateView, ListView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from profile_app.models import Friendship, Profile
from django.http import HttpRequest, JsonResponse
from django.template.loader import render_to_string
from post_app.forms import PostForm
from django.core.exceptions import PermissionDenied
from post_app.models import Post

from .services.freind_qureist import get_friends, get_friendship_recommendation, get_friendship_requests

# class ProfileView(TemplateView):
#     template_name = 'profile_app/profile.html'

class ProfileView(ListView):
    model = Post
    paginate_by = 5
    context_object_name = 'posts'
    template_name = 'profile_app/profile.html'
    form_class = PostForm

    def dispatch(self, request, *args, **kwargs):
        if not request.user.is_authenticated:
            return redirect('auth')
        
        if not Profile.objects.filter(id=self.kwargs.get('user_id')).exists():
            raise PermissionDenied

        return super().dispatch(request, *args, **kwargs)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        first_registration = self.request.session.get('first_registration')
        if first_registration != None and first_registration != '':
            first_registration = True

        context['first_registration'] = first_registration
        context['modal_form'] = self.form_class
        context['profile_user'] = Profile.objects.filter(id=self.kwargs.get('user_id')).first()
        
        return context
    
    def post(self, request: HttpRequest, *args, **kwargs):
        form = self.form_class(request.POST)
        
        if form.is_valid():
                
                return JsonResponse({
                    'success': True,
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
            Post.objects.filter(author=Profile.objects.filter(id=self.kwargs.get('user_id')).first().user).
            select_related('author').
            prefetch_related('tags', 'links', 'images').
            order_by('-id')
        )


class AllFriendsView(LoginRequiredMixin, TemplateView):
    template_name = 'friends_app/friends.html'
    login_url = reverse_lazy('auth')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        # get_friendship_requests(self.request.user.profile)
        context['requests'] = Friendship.objects.all()[:3]
        context['recommendations'] = get_friendship_recommendation(self.request.user.profile)[:6]
        context['friends'] = get_friends(self.request.user.profile)[:6]

        context['all_requests'] = Friendship.objects.all()
        context['all_recommendations'] = get_friendship_recommendation(self.request.user.profile)
        context['all_friends'] = get_friends(self.request.user.profile)

        return context