from django.http import request
from django.shortcuts import render
from rest_framework.response import Response
from rest_framework import status
from .serializers import ShelterSerializer, PetSerializer
from .models import Shelter, Pet
from django.http.response import JsonResponse
from rest_framework.parsers import MultiPartParser, FormParser, JSONParser
from rest_framework.decorators import api_view, authentication_classes, permission_classes, parser_classes

def front(request):
    context = { }
    return render(request, "index.html", context)

@api_view(['POST'])
@permission_classes([])
def shelter(request):

    serializer = ShelterSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save()
        return Response(status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([])
def shelter_get(request):

    if request.method == 'GET':
        shelter = Shelter.objects.all()
        serializer = ShelterSerializer(shelter, many=True)
        return Response(serializer.data)

@api_view(['GET', 'POST'])
@authentication_classes([])
@permission_classes([])
@parser_classes([MultiPartParser,FormParser,JSONParser])
def pet(request):

    if request.method == 'GET':
        pet = Pet.objects.all()
        serializer = PetSerializer(pet, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        serializer = PetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'PUT', 'DELETE'])
@permission_classes([])
def pet_details(request, pk):
    try:
        pet = Pet.objects.get(pk=pk)
    except Pet.DoesNotExist:
        return JsonResponse({'message': 'This pet does not exist'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET':
        pet_serializer = PetSerializer(pet)
        return JsonResponse(pet_serializer.data) 

    elif request.method == 'PUT': 
        pet_data = JSONParser().parse(request) 
        pet_serializer = PetSerializer(pet, data=pet_data) 
        if pet_serializer.is_valid(): 
            pet_serializer.save() 
            return JsonResponse(pet_serializer.data) 
        return JsonResponse(pet_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 

    elif request.method == 'DELETE': 
        pet.delete() 
        return JsonResponse({'message': 'Pet was deleted successfully!'}, status=status.HTTP_204_NO_CONTENT)