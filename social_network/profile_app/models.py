from django.db import models
from django.contrib.auth.models import User

# Create your models here.

class Profile(models.Model):
    user = models.OneToOneField(User, related_name='profile', on_delete=models.CASCADE, verbose_name="Користувач")
    birth_date = models.DateField(null=True, blank=True, verbose_name="Дата народження")
    signature = models.TextField(null=True, blank=True, verbose_name="Підпис")
    avatar = models.ImageField(upload_to='avatars/', null=True, blank=True, verbose_name="Аватарка")
    pseudonym = models.CharField(max_length=50, blank=True, verbose_name="Псевдонім")
    friends = models.ManyToManyField('self', blank=True, verbose_name="Друзі")
    is_image_signature = models.BooleanField(default=False, verbose_name="Підпис зображенням")
    is_text_signature = models.BooleanField(default=False, verbose_name="Підпис текстом")

    def __str__(self):
        return f"Профіль: {self.user.username}"

class Album(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name='albums', verbose_name="Профіль")
    name = models.CharField(max_length=100, verbose_name="Назва альбому")
    theme = models.CharField(max_length=50, blank=True, verbose_name="Тема")
    year = models.IntegerField(null=True, blank=True, verbose_name="Рік подій")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата створення")
    is_shown = models.BooleanField(default=True, verbose_name="Чи відображається")
    is_default = models.BooleanField(default=False, verbose_name="Стандартний")

    def __str__(self):
        return self.name

class AlbumImage(models.Model):
    album = models.ForeignKey(Album, on_delete=models.CASCADE, related_name='images', verbose_name="Альбом")
    image = models.ImageField(upload_to='albums/', verbose_name="Зображення")
    created_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата створення")
    is_shown = models.BooleanField(default=True, verbose_name="Чи відображається")

    def __str__(self):
        return f"Фото для альбому {self.album.name}"