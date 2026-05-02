import re
from django import forms

from .models import *


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
                'name': 'content'
            }
        )
    )

    class Meta:
        model = Post
        fields = ['title', 'topic', 'content']
        
    def __init__(self, *args, links = None, **kwargs):
        
        super().__init__(*args, **kwargs)
        
        self.fields['tags'].queryset = Tag.objects.all()
        
        self.links_list = []
        if links is None: 
            links = []
            
        for link in links:
            clean_link = link.strip()
            if clean_link:
                self.links_list.append(clean_link)
                
    def clean(self):
        clean_data = super().clean()
        urls_field = forms.URLField(max_length=2000)
        for link in self.links_list:
            try:
                urls_field.clean(value=link)
            except forms.ValidationError:
                self.add_error(field=None, error='Некоректне посилання')
        return clean_data
    
    def save(self, author, commit = True):
        post = super().save(commit=False)
        post.author = author
        if commit:
            post.save()
            post.tags.set(self.cleaned_data['tags'])
            for url in self.links_list:
                Link.objects.create(post=post, url=url)
        return post