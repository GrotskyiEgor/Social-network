from django.views.generic import TemplateView, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.urls import reverse_lazy
from django.http import JsonResponse


from .models import Chat
from profile_app.models import Profile
from user_app.models import User
from profile_app.services.freind_qureist import get_friends
from profile_app.services.freind_qureist import *

class ChatView(TemplateView):
    template_name = 'chat_app/chat.html'

    def get_context_data(self, **kwargs):
        context =  super().get_context_data(**kwargs)
        
        context['contacts'] = get_friends(self.request.user.profile)
        context["personal_chats"] = Chat.objects.filter(users=self.request.user.profile, is_group = False).order_by("id")
        
        return context


class ChatWithView(LoginRequiredMixin, View):

    login_url = reverse_lazy("register_login_page")

    def post(self, request, user_id, *args, **kwargs):
        current_user = request.user
        other_user = Profile.objects.get(id = user_id)

        friends = get_friends(current_user.profile)

        if other_user not in friends:
            print(1)
            return JsonResponse({"success": False}, status=403)
        
        user_chat_ids = Chat.objects.filter(users=current_user.profile, is_group=False).values_list("id", flat=True)
        chat = Chat.objects.filter(id__in = user_chat_ids, users=other_user, is_group=False).first()

        if chat is None:
            chat = Chat.objects.create(is_group=False)
            chat.users.add(current_user.profile, other_user)

        return JsonResponse({"success": True, "chat_id": chat.id})