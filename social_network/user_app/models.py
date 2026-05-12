from django.contrib.auth.models import AbstractUser
from django.db import models

# Create your models here.
class User(AbstractUser):
    username = models.CharField(unique=False, max_length=20)
    email = models.EmailField(unique=True, blank=True, null=True)  
    
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = []