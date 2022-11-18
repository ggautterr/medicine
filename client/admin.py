from django.contrib import admin

# Register your models here.
from modeltranslation.admin import TranslationAdmin
from .models import Nationality, Gender, Person, Genetics, Genotype

admin.site.register(Nationality, TranslationAdmin)
admin.site.register(Gender, TranslationAdmin)
admin.site.register(Person, TranslationAdmin)
admin.site.register(Genetics)
admin.site.register(Genotype)
