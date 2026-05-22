from django.shortcuts import render
from django.views.generic import TemplateView
from django.contrib.auth.mixins import LoginRequiredMixin

from profile_app.services.freind_qureist import *

class ChatView(TemplateView):
    template_name = 'chat_app/chat.html'

    def get_context_data(self, **kwargs):
        context =  super().get_context_data(**kwargs)

        context['contacts'] = get_friends(self.request.user.profile)

        return context
