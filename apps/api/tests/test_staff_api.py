from django.urls import reverse
from rest_framework.test import APITestCase


class StaffAPITestCase(APITestCase):
    def test_staff_list_returns_200(self):
        url = reverse('staff-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
