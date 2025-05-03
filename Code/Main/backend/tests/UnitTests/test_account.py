from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient #[1]
from rest_framework import status

class AccountTestCase(TestCase):
    def setUp(self):
        self.client = APIClient()
        self.user = User.objects.create_user(username="testuser", email="test@example.com", password="testpassword")

    def test_account_details(self):
        """Test retrieving account details."""
        response = self.client.get(f"/api/account_details/?username={self.user.username}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data["username"], self.user.username)

    def test_account_update(self):
        """Test updating user account details."""
        response = self.client.put("/api/account/update/", {
            "username": self.user.username,
            "email": "updated@example.com",
            "password": "newpassword"
        })
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.user.refresh_from_db()
        self.assertEqual(self.user.email, "updated@example.com")

#[1] - APIClient: https://www.django-rest-framework.org/api-guide/testing/