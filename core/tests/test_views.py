from urllib import response
from django.test import TestCase
from ..models import Shelter, Pet

class ShelterViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
      number_of_shelters = 5

      for shelter_id in range(number_of_shelters):
        Shelter.objects.create(
          name=f"Pet Shelter {shelter_id}" , email=f"pete{shelter_id}@petshelter.com", password="supersecret123", phone_number="0000000000", postcode="PE150FB", longitude="0.098758", latitude="52.490156"
        )

    def test_view_url_exists_at_desired_location(self):
      response = self.client.get('/api/shelter/find/')
      self.assertEqual(response.status_code, 200)


class PetViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
        number_of_pets = 5
        shelter_obj = Shelter.objects.create(
          name="Pet Shelter" , email="pete@petshelter.com", password="supersecret123", phone_number="0000000000", postcode="PE150FB", longitude="0.098758", latitude="52.490156"
        )
        for pet_id in range(number_of_pets):
            Pet.objects.create(
                shelter=shelter_obj, name=f"Snowball {pet_id}", image="/static/images/sniffles.jpg", age="6", species="Dog", gender="Female",  bio="I like walks"
            )

    def test_view_all_pets_at_desired_location(self):
        response = self.client.get('/api/pet/')
        self.assertEqual(response.status_code, 200)

    def test_view_single_pet_at_desired_location(self):
        response = self.client.get('/api/pet/1')
        self.assertEqual(response.status_code, 200)

    def test_five_pets_have_been_created(self):
        response = self.client.get('/api/pet/5')
        self.assertEqual(response.status_code, 200)
    
    def test_throw_404_if_no_pet(self):
        response = self.client.get('/api/pet/6')
        self.assertEqual(response.status_code, 404)

    def test_delete_animal_using_desire_location(self):
        response = self.client.delete('/api/pet/1')
        self.assertEqual(response.status_code, 204)