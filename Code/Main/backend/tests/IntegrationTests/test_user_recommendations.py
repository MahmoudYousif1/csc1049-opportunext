from django.test import TestCase
from django.contrib.auth.models import User
from rest_framework.test import APIClient#[1]
from rest_framework import status
from backend1.models import Job, Cluster, Recommendation

class UserRecommendationsTestCase(TestCase):
    def setUp(self):
        #Create a user, a job, and a recommendation
        self.client = APIClient()#[1]
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.cluster = Cluster.objects.create(cluster_id=1, medoid_vector=[0.1, 0.2, 0.3])
        self.job = Job.objects.create(job_id=301, title="Cloud Engineer", description="Work with cloud services", cluster=self.cluster)
        Recommendation.objects.create(user=self.user, job=self.job)

    def test_get_recommendations(self):
        #Test retrieving saved job recommendations.
        response = self.client.get(f"/api/get-recommendations/?username={self.user.username}")
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(len(response.data["recommended_jobs"]), 1)
        self.assertEqual(response.data["recommended_jobs"][0]["title"], "Cloud Engineer")

#[1] - APIClient: https://www.django-rest-framework.org/api-guide/testing/
