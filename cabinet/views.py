from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView

from .models import *


class AnalysisListView(LoginRequiredMixin, ListView):
    model = Analysis
    template_name = 'admin/main.html'
