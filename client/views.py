from django.views.generic import TemplateView
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import PersonSerializers
from .models import Person
from django.http import JsonResponse

"""API"""


class PersonGetApiView(generics.ListAPIView):
    serializer_class = PersonSerializers
    queryset = Person.objects.all()
    # lookup_url_kwarg = 'JSHSHIR'
    pass


class PersonView(TemplateView):
    template_name = 'client/main.html'

    def get_context_data(self, **kwargs):
        resp = super(PersonView, self).get_context_data(**kwargs)
        return resp


class GetPersonApiView(APIView):
    serializer_class = PersonSerializers

    def post(self, request, *args, **kwargs):
        JSHSHIR = self.request.data.get("jshshir")
        person = PersonSerializers(Person.objects.filter(JSHSHIR=JSHSHIR).first(), many=False)
        print(person)
        if person:
            return Response(person.data)
        raise ValidationError(detail="Not Found")


class AnalysisApiView(APIView):

    def post(self, request, *args, **kwargs):
        JSHSHIR1 = self.request.data.get("jshshir1")
        JSHSHIR2 = self.request.data.get("jshshir2")

        person1 = Person.objects.filter(JSHSHIR=JSHSHIR1).first()
        person2 = Person.objects.filter(JSHSHIR=JSHSHIR2).first()

        return JsonResponse({}, status=200)
