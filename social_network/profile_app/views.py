from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from profile_app.models import Friendship

from .services.freind_qureist import get_friends, get_friendship_recommendation, get_friendship_requests

class ProfileView(TemplateView):
    template_name = 'profile_app/profile.html'


class AllFriendsView(LoginRequiredMixin, TemplateView):
    template_name = 'friends_app/friends.html'
    login_url = reverse_lazy('auth')

    def get_context_data(self, **kwargs):
        content = super().get_context_data(**kwargs)

        # get_friendship_requests(self.request.user.profile)
        content['requests'] = Friendship.objects.all()[:3]
        content['recommendations'] = get_friendship_recommendation(self.request.user.profile)[:6]
        content['friends'] = get_friends(self.request.user.profile)[:6]

        content['all_requests'] = Friendship.objects.all()
        content['all_recommendations'] = get_friendship_recommendation(self.request.user.profile)
        content['all_friends'] = get_friends(self.request.user.profile)

        return content