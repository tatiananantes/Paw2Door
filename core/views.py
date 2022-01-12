from django.http import request
from django.shortcuts import render
from rest_framework.response import Response
from django.db.models.query import QuerySet
from rest_framework import status, viewsets
from .serializers import ShelterSerializer, PetSerializer
from .models import Shelter, Pet
#from rest_framework.parsers import MultiPartParser, FormParser
#from rest_framework.views import APIView

# Create your views here.
def front(request):
    context = { }
    return render(request, "index.html", context)

class ShelterView(viewsets.ModelViewSet):
    serializer_class = ShelterSerializer
    queryset = Shelter.objects.all()

class PetView(viewsets.ModelViewSet):
    serializer_class = PetSerializer
    queryset = Pet.objects.all()

"""
class ShelterView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        shelter = Shelter.objects.all()
        serializer = ShelterSerializer(shelter, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ShelterSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else: 
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PetView(APIView):
    parser_classes = (MultiPartParser, FormParser)

    def get(self, request):
        pet = Pet.objects.all()
        serializer = PetSerializer(pet, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = PetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        else:
            print('error', serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
"""
