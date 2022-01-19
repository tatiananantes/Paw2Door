"""paw2door URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
# from django.contrib import admin
from django.urls import path, include, re_path
from django.conf import settings
from django.conf.urls.static import static
from core.views import front, shelter, pet
from core import views
from django.views.generic import TemplateView

urlpatterns = [
    # path('admin/', admin.site.urls),
    path("", front, name="front"),
    path("shelter/", shelter, name="shelter"),
    path("pet/", pet, name="pet"),
    re_path(r'^api/shelter/find/', views.shelter_get, name= 'shelters_find'),
    re_path(r'^api/shelter/', views.shelter, name= 'shelters_list'),
    re_path(r'^api/pet/$', views.pet, name= 'pets_list'),
    re_path(r'^api/pet/(?P<pk>[0-9]+)$', views.pet_detail),
    path('auth/', include('djoser.urls')),
    path('auth/', include('djoser.urls.jwt')),
]

urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
