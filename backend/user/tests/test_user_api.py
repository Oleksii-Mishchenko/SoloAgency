z# from rest_framework.authtoken.models import Token
# from django.urls import reverse
# from rest_framework import status
# from rest_framework.test import APIClient
# from django.test import TestCase
# from django.contrib.auth import get_user_model
#
# class TokenAuthenticationTests(TestCase):
#     user_data = {
#         "email": "test@example.com",
#         "password": "test123",
#     }
#
#     def setUp(self):
#         self.client = APIClient()
#
#     def test_create_user(self):
#         url = reverse("user:create")
#         response = self.client.post(url, self.user_data)
#         self.assertEqual(response.status_code, status.HTTP_201_CREATED)
#         self.assertContains(response.data, "email")
#         self.assertEqual(response.data["email"], self.user_data["email"])
#
#     def test_create_token(self):
#         get_user_model().objects.create_user(**self.user_data)
#         url = reverse("user:login")
#         response = self.client.post(url, self.user_data)
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertContains(response.data, "token")
#
#     def test_me(self):
#         user = get_user_model().objects.create_user(
#             email="test@example.com", password="test123"
#         )
#         token = Token.objects.create(user=user)
#
#         self.client.credentials(HTTP_AUTHORIZATION=f"Token {token.key}")
#
#         response = self.client.get(reverse("user:manage"))
#
#         self.assertEqual(response.status_code, status.HTTP_200_OK)
#         self.assertEqual(response.data["email"], user.email)
