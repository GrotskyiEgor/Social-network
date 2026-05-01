from django import forms
from .models import *

class PostForm(forms.ModelForm):
    tags = forms.ModelMultipleChoiceField(
        label = 'Теги',
        required = False,
        queryset= Tag.objects.all(),
        widget = forms.CheckboxSelectMultiple()
    )

    title = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'class': 'create-post-input',
                'placeholder': 'Природа, книга і спокій 🌿',
                'autofocus': True,
                'name': 'title'
            }
        )
    )

    topic = forms.CharField(
        widget=forms.PasswordInput(
            attrs={
                'class': 'create-post-input',
                'placeholder': 'Напишіть тему публікаціїї',
                'name': 'topic'
            }
        )
    )
    
    class Meta:
        model = Post
        fields = ['title', 'topic', 'content']
        labels = {
            'content': 'Текст публікації',
        }
        
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