from django.db import models

from user_app.models import User


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name="profile")
    birth_date = models.DateField(blank=True, null=True)
    
    signature = models.ImageField(upload_to='',blank=True, null=True )
    avatar = models.ImageField(upload_to='', blank=True, null=True)
    
    pseudonym = models.CharField(max_length=50)
    friends = models.ManyToManyField("Profile")
    is_image_signature = models.BooleanField(default=False)
    is_text_signature = models.BooleanField(default=True)


class FriendsRequest(models.Model):
    from_profile = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name="sent_requests")
    to_profile = models.ForeignKey('Profile', on_delete=models.CASCADE, related_name="received_requests")
    create_at = models.DateTimeField(auto_now_add=True)
    
