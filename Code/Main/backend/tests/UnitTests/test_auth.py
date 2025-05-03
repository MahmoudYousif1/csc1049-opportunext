from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient #[1]
from rest_framework import status

class AuthTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user_data = {
            "username": "testuser",
            "email": "test@example.com",
            "password": "testpassword"
        }
        self.user = User.objects.create_user(**self.user_data)

    def test_register_user(self):
        """Test user registration API."""
        response = self.client.post("/api/register/", {
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "newpassword"
        })
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_login_user(self):
        """Test login with correct credentials."""
        response = self.client.post("/login/", {
            "username": self.user_data["username"],
            "password": self.user_data["password"]
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertIn("message", response.data)

    def test_login_invalid_credentials(self):
        """Test login with incorrect credentials."""
        response = self.client.post("/login/", {
            "username": "wronguser",
            "password": "wrongpassword"
        })
        self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED)

#[1] - APIClient: https://www.django-rest-framework.org/api-guide/testing/
#[2] - APIClient with api: https://stackoverflow.com/questions/63331259/when-testing-django-rest-framework-why-cant-i-get-apiclient-credentials-to-a
