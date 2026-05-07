from django.db import models


class Profile(models.Model):
    user = models.OneToOneField("User", on_delete=models.CASCADE, related_name="profile")
    birth_date = models.DateField(blank=True, null=True)
    
    signature = models.ImageField(upload_to='',blank=True, null=True )
    avatar = models.ImageField(upload_to='', blank=True, null=True)
    
    pseudonym = models.CharField(max_length=50)
    friends = models.ManyToManyField("Profile", on_delete=models.CASCADE, related_name="friends")
    is_image_signature = models.BooleanField(default=False)
    is_text_signature = models.BooleanField(default=True)


class FriendsRequest(models.Model):
    from_profile = models.OneToOneField('Profile', on_delete=models.CASCADE, related_name="from_profile")
    to_profile = models.OneToOneField('Profile', on_delete=models.CASCADE, related_name="to_profile")
    create_at = models.DateTimeField(auto_now_add=True)
    
