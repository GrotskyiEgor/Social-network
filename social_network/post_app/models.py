from django.db import models
from django.contrib.auth import get_user_model

from user_app.models import User
from profile_app.models import Profile


class Tag(models.Model):
    name = models.CharField(max_length=255)
    author = models.ForeignKey(Profile, on_delete=models.CASCADE, blank=True, null=True)


    def __str__(self):
        return self.name
    

class PostLike(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name='likes')


class PostHeart(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name='hearts')


class PostView(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE)
    post = models.ForeignKey("Post", on_delete=models.CASCADE, related_name='views')


class Post(models.Model):
    author = models.ForeignKey(Profile, on_delete=models.CASCADE)
    title = models.CharField(max_length=255)
    topic = models.CharField(max_length=255, blank=True, null=True)
    tags = models.ManyToManyField(Tag, related_name='posts')
    content = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    
    def __str__(self):
        return self.title
    

    def addInteract(self, interact, profile):
        print("addHeart", interact, profile)

        if self.hasInteract(interact, profile):
            return False
        
        if interact == 'likes':
            PostLike.objects.create(user=profile, post=self)
        elif interact == 'hearts':
            PostHeart.objects.create(user=profile, post=self)
        elif interact == 'views':
            PostView.objects.create(user=profile, post=self)

        return True
    
    
    def hasInteract(self, interact, profile):
        print("hasInteract", interact, profile)
        return getattr(self, interact).filter(user=profile).exists()


class Link(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='links')
    url = models.URLField(max_length=2000)


    def __str__(self):
        return self.url


class PostImage(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images')
    original = models.ImageField(upload_to="post_images/originals/")
    compressed = models.ImageField(upload_to="post_images/compressed/")
    

    def __str__(self):
        return self.original.name

