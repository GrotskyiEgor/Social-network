from django.http import JsonResponse

from ..models import Chat
from profile_app.models import Profile
from profile_app.services.freind_qureist import get_friends

def friends_pages(friends_list):
    sorted_friends = sorted(friends_list, key=lambda friend: friend.user.username)
    
    last_leter = None
    all_friends = []
    
    for friend in sorted_friends:
        if last_leter != friend.user.username[0]:
            all_friends.append({
                "letter": friend.user.username[0]
            })
            
            last_leter = friend.user.username[0]

        all_friends.append(friend)

    return all_friends

def create_group(request):
    name = request.POST.get("name", "").strip()
    user_ids = request.POST.getlist("users")

    if not name:
        return JsonResponse({'success': False, "error": "name_required"}, status=400)
    
    friend_ids = get_friends(request.user.profile).filter(id__in=user_ids).values_list("id", flat=True)
    chat = Chat.objects.create(name=name, is_group=True, admin=request.user.profile)
    chat.users.add(request.user.profile)
    chat.users.add(*Profile.objects.filter(id__in=friend_ids))

    return JsonResponse({'success': True, 'chat_id': chat.id, "name": chat.name})