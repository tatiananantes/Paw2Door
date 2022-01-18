from django.urls import path
from . import views

urlpatterns = [
    path('shelter/find/', views.shelter_get, name= 'shelters_find'),
    path('shelter/', views.shelter, name= 'shelters_list'),
    path('pet/', views.pet, name= 'pets_list'),
    path('pet/:id', views.pet_details)
]
