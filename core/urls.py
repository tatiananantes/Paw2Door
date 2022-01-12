from django.urls import path
from . import views

urlpatterns = [
    path('shelter/', views.ShelterView.as_view(), name= 'shelters_list'),
    path('pet/', views.PetView.as_view(), name= 'pets_list'),
]