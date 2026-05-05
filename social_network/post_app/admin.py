from django.contrib import admin
from .models import *

admin.register(Tag)
admin.register(Post)
admin.register(Link)
admin.register(PostImage)
admin.register(PostLike)
admin.register(PostHeart)
admin.register(PostView)