from django.test import TestCase

# Create your tests here.
from ..models import Shelter, Pet

class ShelterModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        Shelter.objects.create(name="Pet Shelter", email="pete@petshelter.com", password="supersecret123", phone_number="0000000000", postcode="PE150FB", longitude="0.098758", latitude="52.490156")

    def test_name_label(self):
        shelter = Shelter.objects.get(id=1)
        field_label = shelter._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_password_label(self):
        shelter = Shelter.objects.get(id=1)
        field_label = shelter._meta.get_field('password').verbose_name
        self.assertEqual(field_label, 'password')
        
    def test_email_label(self):
        shelter = Shelter.objects.get(id=1)
        field_label = shelter._meta.get_field('email').verbose_name
        self.assertEqual(field_label, 'email')
    
    def test_phone_label(self):
        shelter = Shelter.objects.get(id=1)
        field_label = shelter._meta.get_field('phone_number').verbose_name
        self.assertEqual(field_label, 'phone number')

    def test_password_max_length(self):
        shelter = Shelter.objects.get(id=1)
        max_length = shelter._meta.get_field('password').max_length
        self.assertEqual(max_length, 50)

    def test_name_max_length(self):
        shelter = Shelter.objects.get(id=1)
        max_length = shelter._meta.get_field('name').max_length
        self.assertEqual(max_length, 100)

class PetModelTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        shelter_obj = Shelter.objects.create(name="Pet Shelter", email="pete@petshelter.com", password="supersecret123", phone_number="0000000000", postcode="PE150FB", longitude="0.098758", latitude="52.490156")
        Pet.objects.create(shelter=shelter_obj, name="Sniffles", image="/static/images/sniffles.jpg", age="6", species="Dog", gender="Female",  bio="I like walks")

    def test_name_label(self):
        pet = Pet.objects.get(id=1)
        field_label = pet._meta.get_field('name').verbose_name
        self.assertEqual(field_label, 'name')

    def test_image_label(self):
        pet = Pet.objects.get(id=1)
        field_label = pet._meta.get_field('image').verbose_name
        self.assertEqual(field_label, 'image')

    def test_pet_parent(self):
        pet = Pet.objects.get(id=1)
        self.assertEqual(pet.shelter.name, "Pet Shelter")
