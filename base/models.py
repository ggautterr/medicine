from django.utils import timezone

import uuid as uuid
from django.db import models


class BaseModelManager(models.Manager):

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(
            is_delete=False
        )


class DeleteBaseModelManager(models.Manager):

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs).filter(
            is_delete=True
        )


class AllBaseModelManager(models.Manager):

    def get_queryset(self, *args, **kwargs):
        return super().get_queryset(*args, **kwargs)


# Create your models here.
class Base(models.Model):
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True)
    restored_at = models.DateTimeField(null=True, blank=True)

    is_delete = models.BooleanField(default=False)

    uuid = models.UUIDField(unique=True, default=uuid.uuid4, editable=False)

    objects = BaseModelManager()
    delete_objects = DeleteBaseModelManager()
    all_objects = AllBaseModelManager()

    class Meta:
        abstract = True

    def delete(self, using=None, keep_parents=False):
        self.is_delete = True
        self.deleted_at = timezone.now()

        for relation in self._meta._relation_tree:
            filter = {relation.name: self}
            for obj in relation.model.objects.filter(**filter):
                obj.delete()

        self.save()

    def restore(self, *args, **kwargs):

        self.is_delete = False
        self.restored_at = timezone.now()

        for relation in self._meta._relation_tree:
            filter = {relation.name: self}
            for obj in relation.model.objects.filter(**filter):
                obj.restore()
        self.save()

    def erase(self, **kwargs):
        """
        Actually delete from database.
        """
        return super().delete(**kwargs)
