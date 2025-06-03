from django.urls import reverse
from rest_framework.test import APITestCase


class ProjectsAPITestCase(APITestCase):
    def test_projects_list_returns_200(self):
        url = reverse('project-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
