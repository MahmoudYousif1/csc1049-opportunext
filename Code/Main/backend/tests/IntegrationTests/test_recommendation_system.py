from django.test import TestCase
from django.contrib.auth.models import User
from backend1.models import Job, Cluster, Recommendation

class RecommendationSystemTestCase(TestCase):
    def setUp(self):
        """Create users, clusters, and jobs for testing."""
        self.user = User.objects.create_user(username="testuser", password="testpassword")
        self.cluster1 = Cluster.objects.create(cluster_id=1, medoid_vector=[0.2, 0.3, 0.5])
        self.job1 = Job.objects.create(job_id=201, title="Machine Learning Engineer", description="ML tasks", cluster=self.cluster1, vector=[0.2, 0.3, 0.5])
        self.job2 = Job.objects.create(job_id=202, title="Software Developer", description="Build software", cluster=self.cluster1, vector=[0.4, 0.1, 0.3])

    def test_generate_recommendation(self):
        """Check if recommendations are correctly created."""
        Recommendation.objects.create(user=self.user, job=self.job1)
        self.assertEqual(Recommendation.objects.count(), 1)
        self.assertEqual(Recommendation.objects.first().user.username, "testuser")
