from django.urls import reverse
from rest_framework.test import APITestCase


class NewsAPITestCase(APITestCase):
    def test_news_list_returns_200(self):
        url = reverse('news-list')
        response = self.client.get(url)
        self.assertEqual(response.status_code, 200)
