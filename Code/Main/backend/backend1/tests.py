from django.test import TestCase
from django.contrib.auth.models import User
from backend1.serializers import Users
from django.urls import reverse
from backend1.models import CV
from django.core.files.uploadedfile import SimpleUploadedFile

#Testing that a user is created correctly
class UserTest(TestCase):
    def test_create_user(self):

        #hardcoded test data
        data = {'username': 'user1', 'email': 'thisEmail@gmail.com', 'password': 'pass1234'}
       
        check = Users(data=data)
        self.assertTrue(check.is_valid(), check.errors)
        user = check.save()
        self.assertEqual(user.username, data['username'])
        self.assertTrue(user.password, date['password'])

    

class CVUploadTest(TestCase):
    def setUp(self):
        self.upload_url = reverse('upload_cv')
        # Create a user for testing.
        self.user = User.objects.create_user(
            username="testuser", 
            email="test@example.com", 
            password="testpass"
        )



def test_successful_cv_upload(self):

        cv1 = SimpleUploadedFile(
            "test_cv.pdf", b"Dummy CV content", content_type="application/pdf"
        )
        data = {
            "username": "testuser",
            "cv_file": cv1,
        }
        # Make a POST request with multipart/form-data.
        response = self.client.post(self.upload_url, data, format="multipart")
        self.assertEqual(response.status_code, 201)
        # CV record has been created for the user.
        self.assertTrue(CV.objects.filter(user=self.user).exists())

#Missing username
    def test_cv_upload_missing_username(self):
     
        cv1 = SimpleUploadedFile(
            "test_cv.pdf", b"Dummy CV content", content_type="application/pdf"
        )
        data = {
            "cv_file": cv1,
        }
        response = self.client.post(self.upload_url, data, format="multipart")
        self.assertEqual(response.status_code, 400)
        self.assertEqual(response.data.get("error"), "Username is required")

#Testing when a user is not found
    def test_cv_upload_user_not_found(self):

        cv1 = SimpleUploadedFile(
            "test_cv.pdf", b"Dummy CV content", content_type="application/pdf"
        )
        data = {
            "username": "nonexistent_user",
            "cv_file": cv1,
        }
        response = self.client.post(self.upload_url, data, format="multipart")
        self.assertEqual(response.status_code, 404)
        self.assertEqual(response.data.get("error"), "User not found")


#Testing whether a user already exists
    def test_cv_upload_already_exists(self):
   
        cv1 = SimpleUploadedFile(
            "test_cv.pdf", b"Dummy CV content", content_type="application/pdf"
        )
        data = {
            "username": "testuser",
            "cv_file": cv1,
        }
        response = self.client.post(self.upload_url, data, format="multipart")
        self.assertEqual(response.status_code, 201)
        cv2 = SimpleUploadedFile(
            "test_cv2.pdf", b"New Dummy CV content", content_type="application/pdf"
        )
        data2 = {
            "username": "testuser",
            "cv_file": cv2,
        }
        response2 = self.client.post(self.upload_url, data2, format="multipart")
        self.assertEqual(response2.status_code, 400)
        self.assertEqual(response2.data.get("error"), "User already uploaded a CV")