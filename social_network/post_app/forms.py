import re
from django import forms
from PIL import Image
from io import BytesIO
from .models import *
from django.core.files.base import ContentFile


class MultipleFileInput(forms.ClearableFileInput):
    allow_multiple_selected = True


class MultipleFileField(forms.FileField):
    def clean(self, data, initial = True):
        
        single_file_clean = super().clean

        if isinstance(data, (list, tuple)):
            return [single_file_clean(file, initial) for file in data]
        
        return single_file_clean(data, initial)


class TagForm(forms.ModelForm):
    name = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'class': 'create-post-input',
                'placeholder': '#',
                'autofocus': True,
            }
        )
    )

    class Meta:
        model = Tag
        fields = ['name']

    def clean_name(self):
        name = self.cleaned_data.get('name', '').strip()

        print('name', name)

        name = name.lstrip('#')

        if not name:
            print('Введить name')
            raise forms.ValidationError('Введить tag')
        
        if not re.fullmatch(r'[a-zA-Z0-9]+', name):
            print("Тільки латиниця, цифри та '_'")
            raise forms.ValidationError("Тільки латиниця, цифри та '_'")

        name = '#' + name
            
        if Tag.objects.filter(name=name).exists():
            print("Такий tag вже зайнятий")
            raise forms.ValidationError('Такий tag вже зайнятий') 

        print('name', name)

        return name


class PostForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(
        label = 'Теги',
        required = False,
        queryset= Tag.objects.all(),
        widget = forms.CheckboxSelectMultiple()
    )

    title = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'class': 'create-post-input',
                'placeholder': 'Природа, книга і спокій 🌿',
                'autofocus': True,
                'name': 'title'
            }
        )
    )

    topic = forms.CharField(
        widget=forms.TextInput(
            attrs={
                'class': 'create-post-input',
                'placeholder': 'Напишіть тему публікаціїї',
                'name': 'topic'
            }
        )
    )

    content = forms.CharField(
        widget=forms.Textarea(
            attrs={
                'class': 'create-post-textarea',
                'placeholder': """Інколи найкращі ідеї народжуються в тиші. Природа, книга і спокій — усе, що потрібно, аби перезавантажитись. #відпочинок #натхнення #життя #природа #читання #спокій #гармонія""",
                'name': 'content',
                'id': 'create_post_modal_text',
            }
        )
    )

    images = MultipleFileField(
        label = "Зображення",
        required = False,
        widget = MultipleFileInput(
            attrs={
                'multiple': True, 
                'accept': 'images/*',
                'class': 'images-field-hidden',
                'id': 'images_field_hidden'
            }
        )
    )

    class Meta:
        model = Post
        fields = ['title', 'topic', 'content']
        
    def __init__(self, *args, links = None, images = None, **kwargs):
        
        super().__init__(*args, **kwargs)
        
        self.fields['tags'].queryset = Tag.objects.all()
        
        self.links_list = []
        if links is None: 
            links = []
            
        for link in links:
            clean_link = link.strip()
            if clean_link:
                self.links_list.append(clean_link)

        self.images_list = []
        if images is not None:
            self.images_list = list(images)
                    
    def clean(self):
        clean_data = super().clean()
        urls_field = forms.URLField(max_length=2000)

        for link in self.links_list:
            try:
                urls_field.clean(value=link)
            except forms.ValidationError:
                self.add_error(field=None, error='Некоректне посилання')

        image_field = forms.ImageField()
        
        for image in self.images_list:
            try:
                image_field.clean(image)
            except forms.ValidationError:
                self.add_error('images', "Завантажте коректне зображення")
            
        return clean_data
    
    
    def save(self, author, commit = True):
        post = super().save(commit=False)
        post.author = author
        print('create post')
        
        if commit:
            post.save()
            post.tags.set(self.cleaned_data['tags'])
            print('self.cleaned_data', self.cleaned_data['tags'])
            for url in self.links_list:
                Link.objects.create(post=post, url=url)

            for image in self.images_list:
                PostImage.objects.create(
                    post=post,
                    original=image,
                    compressed=self.compress_image(image)
                )

        return post
    

    def compress_image(self, image):
        image.seek(0)
        image = Image.open(image)
        image = image.convert('RGB')
        
        quality = 85
        width, height = image.size
        
        MAX_COMPRESSED_IMAGE_SIZE = 5 * 1024 * 1024
        
        while True:
            buffer = BytesIO()
            image.save(buffer, format='JPEG', quality = quality, optimize = True)
            if buffer.tell() <= MAX_COMPRESSED_IMAGE_SIZE:
                break
            if quality > 35:
                quality -= 10
            else:
                if width <= 50 or height <= 50:
                    break

                width = int(width * 0.9)
                height = int(height * 0.9)
                image = image.resize((width, height), Image.Resampling.LANCZOS)

            image.seek(0)
            compressed_image = f'compressed_{image.name.rsplit('.', 1)[0]}.jpg'
            compressed_image = ContentFile(buffer.getvalue(), name=compressed_image)

            return compressed_image