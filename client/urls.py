from django.urls import path
from . import views

app_name = 'client'

urlpatterns = [
    path('', views.ClientView.as_view(), name='client'),
]
