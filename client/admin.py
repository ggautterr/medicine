from django.contrib import admin

# Register your models here.
from modeltranslation.admin import TranslationAdmin
from .models import Category, Book

admin.site.register(Category, TranslationAdmin)
admin.site.register(Book, TranslationAdmin)
