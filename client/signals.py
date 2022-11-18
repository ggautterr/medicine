from django.db.models.signals import post_save
from .models import Genetics, Genotype
from django.dispatch import receiver


@receiver(post_save, sender=Genetics)
def create_request(sender, instance, created, **kwargs):
    if created:
        Genotype.objects.create(appearance=f"{instance.type.title()}{instance.type.title()}", genetics=instance)
        Genotype.objects.create(appearance=f"{instance.type.title()}{instance.type.lower()}", genetics=instance)
        Genotype.objects.create(appearance=f"{instance.type.lower()}{instance.type.lower()}", genetics=instance)
