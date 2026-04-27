from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    username = models.CharField(unique=False, max_length=20)
    user_handle = models.CharField(max_length=30, blank=True, null=True, unique=True)
    email = models.EmailField(unique=True, blank=True, null=True)
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []