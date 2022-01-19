from django.urls import path, re_path
from . import views

urlpatterns = [
    re_path(r'^api/shelter/find/', views.shelter_get, name= 'shelters_find'),
    re_path(r'^api/shelter/', views.shelter, name= 'shelters_list'),
    re_path(r'^api/pet/$', views.pet, name= 'pets_list'),
    re_path(r'^pet/<int:id>', views.pet_detail)
]
