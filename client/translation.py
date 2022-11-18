from modeltranslation.translator import translator, TranslationOptions
from .models import Gender, Person, Nationality


class NationalityTranslationOptions(TranslationOptions):
    fields = ('name',)


class GenderTranslationOptions(TranslationOptions):
    fields = ('type',)


class PersonTranslationOptions(TranslationOptions):
    fields = ('surname_name', 'father_name', 'given_name')


translator.register(Nationality, NationalityTranslationOptions)
translator.register(Gender, GenderTranslationOptions)
translator.register(Person, PersonTranslationOptions)
