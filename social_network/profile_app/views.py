from django.shortcuts import render
from django.views.generic import TemplateView
from post_app.models import Post

class ProfileView(TemplateView):
    template_name = 'profile_app/profile.html'