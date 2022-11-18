from django.views.generic import TemplateView
from rest_framework import generics
from rest_framework.exceptions import ValidationError
from rest_framework.response import Response
from rest_framework.views import APIView

from .prognosis import analysis
from .serializers import PersonSerializers
from .models import Person, Nationality, Genetics
from django.http import JsonResponse

"""API"""

class PersonView(TemplateView):
    template_name = 'client/main.html'

    def get_context_data(self, **kwargs):
        resp = super(PersonView, self).get_context_data(**kwargs)
        resp['nationality'] = Nationality.objects.all()
        resp['genetics'] = Genetics.objects.all()
        return resp


class GetPersonApiView(APIView):
    serializer_class = PersonSerializers

    def post(self, request, *args, **kwargs):
        JSHSHIR = self.request.data.get("jshshir")
        person = PersonSerializers(Person.objects.filter(JSHSHIR=JSHSHIR).first(), many=False)
        if person.data.get('id'):
            return Response(person.data)

        raise ValidationError(detail="Not Found")


class AnalysisApiView(APIView):

    def post(self, request, *args, **kwargs):
        JSHSHIR1 = self.request.data.get("jshshir1")
        JSHSHIR2 = self.request.data.get("jshshir2")

        data = analysis(JSHSHIR1, JSHSHIR2)
        try:
            return JsonResponse({"analysis": data}, status=200)
        except:
            return JsonResponse({"analysis": {}}, status=200)
