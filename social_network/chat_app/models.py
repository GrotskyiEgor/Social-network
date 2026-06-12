from django.db import models
from user_app.models import User
from profile_app.models import Profile

MONTHS_UA = {
    1: "січня",
    2: "лютого",
    3: "березня",
    4: "квітня",
    5: "травня",
    6: "червня",
    7: "липня",
    8: "серпня",
    9: "вересня",
    10: "жовтня",
    11: "листопада",
    12: "грудня",
}

class Chat(models.Model):
    users = models.ManyToManyField(Profile, related_name='chats', verbose_name="Участники")
    name = models.CharField(max_length=30, blank=True, null=True, verbose_name="Назва чату")
    is_group = models.BooleanField(default=False, verbose_name="Групповий?")
    avatar = models.ImageField(upload_to='chat_avatars/', blank=True, null=True, verbose_name="Аватар")
    
    admin = models.ForeignKey(
        Profile, 
        on_delete=models.SET_NULL, 
        related_name='admin_chats',
        blank=True, 
        null=True,
        verbose_name="Адмін"
    )
    
    def __str__(self):
        return self.name if self.name else f"Chat {self.id}"
    

class Message(models.Model):
    text = models.TextField(verbose_name="Текст")
    chat = models.ForeignKey(Chat, on_delete=models.CASCADE, related_name='messages')
    created_at = models.DateTimeField(auto_now_add=True)
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='sent_messages')
    readers = models.ManyToManyField(Profile, related_name='read_messages', blank=True)
    
    def __str__(self):
        return f"{self.sender.user.username}: {self.text[:20]}"
    
    def format_ua_date(self):
        return f"{self.created_at.day} {MONTHS_UA[self.created_at.month]} {self.created_at.year}"
    
class MessageImage(models.Model):
    image = models.ImageField(upload_to='messages_images/')
    message = models.ForeignKey(Message, on_delete=models.CASCADE, related_name='images')