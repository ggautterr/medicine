from django.db import models
from base.models import Base


class Nationality(Base):
    name = models.CharField(max_length=255)

    def __str__(self):
        return f"{self.name}"


class Gender(Base):
    type = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.type}"


class Genetics(Base):
    type = models.CharField(max_length=1, null=True, blank=True)
    name = models.CharField(max_length=255, null=True, blank=True)

    def __str__(self):
        return f"{self.name} | {self.type}"


class Genotype(Base):
    genetics = models.ForeignKey(Genetics, null=True, blank=True, on_delete=models.CASCADE)
    appearance = models.CharField(max_length=2, null=True, blank=True)

    def __str__(self):
        return f"{self.genetics.type} | ({self.appearance})"


class Person(Base):
    surname_name = models.CharField(max_length=255, null=True, blank=True)
    father_name = models.CharField(max_length=255, null=True, blank=True)
    given_name = models.CharField(max_length=255, null=True, blank=True)
    nationality = models.ForeignKey(Nationality, null=True, blank=True, on_delete=models.CASCADE)
    date_of_birth = models.DateField()
    place_of_birth = models.CharField(max_length=255, null=True, blank=True)

    JSHSHIR = models.CharField(max_length=14, null=True, blank=True, unique=True)
    gender = models.ForeignKey(Gender, null=True, blank=True, on_delete=models.SET_NULL)
    genotype = models.ManyToManyField(Genotype, blank=True)

    def __str__(self):
        return f"{self.surname_name} {self.given_name}"
