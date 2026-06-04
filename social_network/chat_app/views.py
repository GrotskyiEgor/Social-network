from django.views.generic import TemplateView, View
from django.contrib.auth.mixins import LoginRequiredMixin
from django.core.paginator import Paginator
from django.template.loader import render_to_string
from django.urls import reverse_lazy
from django.http import JsonResponse


from .models import Chat
from profile_app.models import Profile
from user_app.models import User
from .services.load_msg import get_msg_list
from .services.add_group_page import friends_pages, create_group
from profile_app.services.freind_qureist import get_friends
from profile_app.services.freind_qureist import *

class ChatView(TemplateView):
    template_name = 'chat_app/chat.html'

    def get_context_data(self, **kwargs):
        context =  super().get_context_data(**kwargs)
        
        friends_list = get_friends(self.request.user.profile)

        context['user_profile'] = self.request.user.profile
        context['friends'] = friends_list[:12]
        context["chats"] = Chat.objects.filter(users=self.request.user.profile, is_group = False).order_by("id")[:7]
        context["all_friends"] = friends_pages(friends_list) 
        
        return context
    
    def render_to_response(self, context, **response_kwargs):
        if self.request.headers.get("X-Requested-With") == "XMLHttpRequest": 
            paginator_list = []
            paginato_page = self.request.GET.get('page', 1)
            filter_text = self.request.GET.get('filter_text', '')
            selection = self.request.GET.get('selection', 0)

            if selection == 'friends':
                paginator_list = get_friends(self.request.user.profile, filter_text)
            elif selection == 'chats':
                paginator_list = Chat.objects.filter(users=self.request.user.profile, is_group = False).order_by("id")

            page_obj = Paginator(paginator_list, 12 if selection == 'friends' else 7).get_page(paginato_page)
            
            if selection == 'friends':
                return JsonResponse({
                    'friends_html': render_to_string(
                        'chat_app/particals/friends.html',
                        {"friends": page_obj}      
                    ),
                    'has_next': page_obj.has_next()
                })
            elif selection == 'chats':
                return JsonResponse({
                    'chats_html': render_to_string(
                        'chat_app/particals/chats.html',
                        {"chats": page_obj, 'user_profile': self.request.user.profile}      
                    ),
                    'has_next': page_obj.has_next()
                })               
            elif selection == 'messages':
                chat = Chat.objects.get(id=int(self.request.GET.get('chat_id', None)))

                if chat:
                    messages_list = chat.messages.order_by('-created_at')
                    page_obj = Paginator(messages_list, 20).get_page(paginato_page)
                    messages = reversed(page_obj.object_list)
                    messages_with_dates = get_msg_list(messages)

                    return JsonResponse({
                        'messages_html': render_to_string(
                            'chat_app/chat_msg/msg.html',
                            {'chat_messages': messages_with_dates, 'user': self.request.user}
                        ),
                        'has_next': page_obj.has_next()
                    })

        return super().render_to_response(context, **response_kwargs)


class ChatWithView(LoginRequiredMixin, View):
    login_url = reverse_lazy("auth")

    def post(self, request, user_id, *args, **kwargs):
        add_new_user = False
        current_user = request.user
        other_user = Profile.objects.get(id = user_id)

        friends = get_friends(current_user.profile)

        if other_user not in friends:
            return JsonResponse({"success": False}, status=403)
        
        user_chat_ids = Chat.objects.filter(users=current_user.profile, is_group=False).values_list("id", flat=True)
        chat = Chat.objects.filter(id__in = user_chat_ids, users=other_user, is_group=False).first()

        if chat is None:
            add_new_user = True
            chat = Chat.objects.create(is_group=False)
            chat.users.add(current_user.profile, other_user)

        return JsonResponse({
            "success": True, 
            'chats_html': render_to_string(
                    'chat_app/particals/chats.html',
                    {"chats": [chat if add_new_user else []], 'user_profile': self.request.user.profile}      
                ),
            "chat_id": chat.id
        })
    
class CreateGroupView(LoginRequiredMixin, View):
    login_url = reverse_lazy("auth")
    
    def post(self, request):
        return create_group(request)
        