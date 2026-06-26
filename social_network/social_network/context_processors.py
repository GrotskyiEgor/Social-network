from django.conf import settings

def app_settings(request):
    return {
        'LOCAL': str(settings.LOCAL),
        'IP': settings.IP,
        'PORT': settings.PORT,
        'IP_WS': settings.IP_WS
    }