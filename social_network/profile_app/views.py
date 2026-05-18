from django.shortcuts import render, redirect
from django.views.generic import TemplateView, ListView, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.paginator import Paginator
from django.urls import reverse_lazy
from django.http import HttpRequest, JsonResponse
from django.template.loader import render_to_string
from django.core.exceptions import PermissionDenied


from profile_app.models import Friendship, Profile
from post_app.forms import PostForm
from post_app.models import Post
from .services.freind_qureist import get_friends, get_friendship_recommendation, get_friendship_requests


class ProfileView(ListView):
    template_name = 'profile_app/profile.html'
    form_class = PostForm
    paginate_by = 6
    context_object_name = 'posts'

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

        for post in context['posts']:
            post.toggleInteract('views', self.request.user.profile)
        
        return context
    
    def post(self, request: HttpRequest, *args, **kwargs):
        form = self.form_class(request.POST)
        
        if form.is_valid():
                
            return JsonResponse({
                'success': True
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
            Post.objects.filter(author=Profile.objects.filter(id=self.kwargs.get('user_id')).first()).
            select_related('author').
            prefetch_related('tags', 'links', 'images').
            order_by('-id')
        )


class AllFriendsView(LoginRequiredMixin, TemplateView):
    template_name = 'friends_app/friend.html'
    login_url = reverse_lazy('auth')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)

        context['requests'] = get_friendship_requests(self.request.user.profile)[:3]
        context['recommendations'] = get_friendship_recommendation(self.request.user.profile)[:6]
        context['friend'] = get_friends(self.request.user.profile)[:6]

        return context
    

class FriendsAction(LoginRequiredMixin, TemplateView):
    def post(self, request, action, from_user_id, *args, **kwargs):
        print(action)
        from_user = Profile.objects.get(id=from_user_id)
        friendship = Friendship.objects.filter(from_user=from_user, to_user=request.user.profile).first()

        if action == "accept":
            friendship.status = 'accepted'
            friendship.save()

            print(friendship.status, friendship.to_user.id, friendship.from_user.id)
        elif action == "request":
            new_friendship = Friendship.objects.create(
                from_user=from_user,
                to_user=request.user.profile,
                status='pending'
            )

            print(new_friendship.status, new_friendship.to_user.id, new_friendship.from_user.id)
        elif action == "delete_frienship":
            friendship.delete()
            print('delete')
        
        return JsonResponse({'success': True})

    
class FriendsSelectionView(LoginRequiredMixin, View):
    def get(self, request, selection, *args, **kwargs ):
        user = None 

        if selection == 'requests':
            user = get_friendship_requests(request.user.profile)
        elif selection == 'recommendations':
            user = get_friendship_recommendation(request.user.profile)
        elif selection == 'friend':
            user = get_friends(request.user.profile)

        page_obj = Paginator(user, 6).get_page(request.GET.get('page', 1))

        html = render_to_string( 
            f"friends_app/particals/{selection}.html",
            {selection: page_obj.object_list},
            request=request
        )
        
        return JsonResponse({"html": html, "has_next_page": page_obj.has_next()})
