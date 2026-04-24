from django.http import HttpResponse
from django.core.mail import send_mail, BadHeaderError
import random

from django.conf import settings

def send_email_code(email, code):
    subject = "Пробное заголовок"
    message = f"Пробное текст, код: {code}"
    
    try:
        send_mail(
            subject=subject,
            message=message,
            from_email=settings.DEFAULT_FROM_EMAIL,
            recipient_list=[email]
        )
    except BadHeaderError:
        return HttpResponse('Найден некорректный заголовок')
    

def generate_code(length=6):
    code = ''
    list_numbers = 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM1234567890'

    for numb in range(length):
        code += random.choice(list_numbers)

    return code