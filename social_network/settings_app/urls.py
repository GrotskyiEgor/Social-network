from django.urls import path
from .views import SettingsView, SettingsSaveView, SettingsSaveSignView

urlpatterns = [
    path('', SettingsView.as_view(template_name = 'settings_app/settings.html'), name='settings'),
    path('save/<str:action>/', SettingsSaveView.as_view(), name='settings_save'),
    path('save_signature/', SettingsSaveSignView.as_view(), name='save_signature')
]