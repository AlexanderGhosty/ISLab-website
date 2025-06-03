from django.urls import reverse
from rest_framework.test import APITestCase


class PublicationsAPITestCase(APITestCase):
    def test_publications_list_returns_200(self):
        url = reverse('publication-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
