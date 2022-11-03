from django.db import models
from base.models import Base


class Analysis(Base):
    STATUS = (
        (1, 'BAD'),
        (2, 'NORMAL'),
        (3, 'Great')
    )

    customer_name = models.CharField(max_length=255, null=True, blank=True)
    status = models.IntegerField(choices=STATUS, null=True, blank=True)
    photo = models.ImageField(upload_to='analysis/', null=True, blank=True)

    def __str__(self):
        return f"{self.id} | {self.customer_name} | {self.status}"
