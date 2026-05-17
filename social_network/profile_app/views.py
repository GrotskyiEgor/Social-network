from django.shortcuts import render
from django.views.generic import TemplateView, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from profile_app.models import Friendship, Profile
from django.http import JsonResponse
from django.core.paginator import Paginator
from django.template.loader import render_to_string

from .services.freind_qureist import get_friends, get_friendship_recommendation, get_friendship_requests


class ProfileView(TemplateView):
    template_name = 'profile_app/profile.html'


class AllFriendsView(LoginRequiredMixin, TemplateView):
    template_name = 'friends_app/friends.html'
    login_url = reverse_lazy('auth')

    def get_context_data(self, **kwargs):
        content = super().get_context_data(**kwargs)

        content['requests'] = get_friendship_requests(self.request.user.profile)[:3]
        content['recommendations'] = get_friendship_recommendation(self.request.user.profile)[:6]
        content['friends'] = get_friends(self.request.user.profile)[:6]

        return content
    
class FriendsSelectionView(LoginRequiredMixin, View):
    def get(self, request, selection, *args, **kwargs ):
        user = None 

        if selection == 'requests':
            user = get_friendship_requests(request.user.profile)
        elif selection == 'recommendations':
            user = get_friendship_recommendation(request.user.profile)
        elif selection == 'friends':
            user = get_friends(request.user.profile)

        page_obj = Paginator(user, 6).get_page(request.GET.get('page', 1))

        html = render_to_string( 
            f"profile_app/templates/friends_app/particals/{selection}.html",
            {selection: page_obj.object_list},
            request=request
        )
        
        return JsonResponse({"html": html, "has_next_page": page_obj.has_next()})