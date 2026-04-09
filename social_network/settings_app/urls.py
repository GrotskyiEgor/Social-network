from django.urls import path
from .views import SettingsView

urlpatterns = [
    path(route = '', view = SettingsView.as_view(template_name = 'settings_app/settings.html'), name='settings'),
]