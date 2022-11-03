from django.urls import path
from . import views

app_name = 'cabinet'

urlpatterns = [
    path('', views.AnalysisListView.as_view(),  name='cabinet'),
]
