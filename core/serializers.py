from rest_framework import serializers
from djoser.serializers import UserCreateSerializer
from django.contrib.auth import get_user_model
from .models import Shelter, Pet
Shelter = get_user_model()

class ShelterCreateSerializer(UserCreateSerializer):
    class Meta(UserCreateSerializer.Meta):
        model = Shelter
        fields = ('id', 'email', 'name', 'phone_number', 'password')

class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = '__all__'

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'
