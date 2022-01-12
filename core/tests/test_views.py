from django.test import TestCase
from ..models import Shelter, Pet

class ShelterViewTest(TestCase):
    @classmethod
    def setUpTestData(cls):
      number_of_shelters = 5

      for shelter_id in range(number_of_shelters):
        Shelter.objects.create(
          name=f"Pet Shelter {shelter_id}" , email=f"pete{shelter_id}@petshelter.com", password="supersecret123", phone_number="0000000000"
        )

    def test_view_url_exists_at_desired_location(self):
      response = self.client.get('/api/shelter/')
      self.assertEqual(response.status_code, 200)
