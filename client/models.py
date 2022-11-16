from django.db import models
from base.models import Base


class Category(Base):
    name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.name}"

class Book(Base):
    category = models.ForeignKey(Category, null=True, blank=True, on_delete=models.CASCADE)
    name = models.CharField(max_length=255, null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    author = models.CharField(max_length=255, null=True, blank=True)
    since = models.IntegerField(null=True, blank=True)
    image = models.ImageField(null=True, blank=True, upload_to="books")

    def __str__(self):
        return f"{self.name}"
