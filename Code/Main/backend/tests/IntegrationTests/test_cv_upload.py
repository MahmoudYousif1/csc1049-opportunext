from django.test import TestCase #[1]
from django.contrib.auth.models import User
from django.core.files.uploadedfile import SimpleUploadedFile
from backend1.models import CV

class CVUploadTest(TestCase):
    """
    Test case for uploading a CV and associating it with a user.
    """

    def setUp(self):
        """
        Set up a test user for CV upload.
        """
        self.user = User.objects.create_user(username="cvuser", password="testpassword")

    def test_cv_upload(self):
        """
        Verify that a CV can be uploaded and linked to the correct user.
        """
        cv_file = SimpleUploadedFile("cv.pdf", b"Dummy PDF content", content_type="application/pdf")#[2]
        cv = CV.objects.create(user=self.user, cv_file=cv_file)
        
        self.assertEqual(CV.objects.count(), 1)
        self.assertEqual(cv.user.username, "cvuser")

#[1] - Testing with django: https://docs.djangoproject.com/en/5.1/topics/testing/overview/
#[2] - Using SimpleUpLoadFile: https://docs.djangoproject.com/en/5.1/topics/testing/overview/
