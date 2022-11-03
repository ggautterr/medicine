from django.contrib.auth.mixins import LoginRequiredMixin

# Create your views here.
from django.views.generic import TemplateView


class ClientView(TemplateView):
    template_name = 'client/main.html'

    def get_context_data(self, **kwargs):
        resp = super(ClientView, self).get_context_data(**kwargs)
        resp['bla'] = 'bla_bla'
        return resp
