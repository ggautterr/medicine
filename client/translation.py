from modeltranslation.translator import translator, TranslationOptions
from .models import Category, Book


class CategoryTranslationOptions(TranslationOptions):
    fields = ('name',)


class BookTranslationOptions(TranslationOptions):
    fields = ('name', 'description', 'author',)


translator.register(Category, CategoryTranslationOptions)
translator.register(Book, BookTranslationOptions)
