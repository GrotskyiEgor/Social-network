import json
import asyncio
from channels.generic.websocket import AsyncWebsocketConsumer
from channels.db import database_sync_to_async

from profile_app.models import Profile


class ActiveConsumer(AsyncWebsocketConsumer):
    async def connect(self):
        self.user = self.scope['user']
        self.profile_id = self.scope['url_route']['kwargs']['profile_id']
        self.room_name = f'is_active_{self.profile_id}'

        if not self.user.is_authenticated:
            await self.close()
            return
        
        await self.channel_layer.group_add(self.room_name, self.channel_name)

        await self.accept()

        await self.send(
            text_data=json.dumps(
                {
                    'type': 'connection_confirmation',
                    'message': 'Підключення до чату було успішно встановлено is_active'
                }
            )
        )

        await self.set_profile_is_active(value=True)

        
    async def disconnect(self, code):
        await self.set_profile_is_active(value=False)


    @database_sync_to_async
    def check_profile_is_active(self):        
        profile = Profile.objects.filter(id = int(self.profile_id)).first()
        return profile.is_active
    
    
    @database_sync_to_async
    def set_profile_is_active(self, value):
        profile = Profile.objects.filter(id = int(self.profile_id)).first()
        profile.is_active = value
        profile.save()
        