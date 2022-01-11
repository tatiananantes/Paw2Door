from rest_framework import serializers
from .models import Shelter, Pet

class ShelterSerializer(serializers.ModelSerializer):
    class Meta:
        model = Shelter
        fields = '__all__'

class PetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Pet
        fields = '__all__'