from django.urls import path
from . import views

app_name = 'main'

urlpatterns = [
    path('', views.PersonView.as_view(), name='main'),

    path('person/', views.GetPersonApiView.as_view(), name='get_person'),

    # path('main/', views.PersonGetApiView.as_view(), name='main'),  # API

]
