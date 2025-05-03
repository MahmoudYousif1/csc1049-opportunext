from django.test import TestCase #[1]
from backend1.models import Cluster, Job

class ClusterAssignmentTestCase(TestCase):
    """
    Test case for verifying cluster assignments and medoid job assignments.
    """

    def setUp(self):
        """
        Set up test data with clusters and jobs.
        Creates a cluster and assigns jobs to it.
        """
        self.cluster1 = Cluster.objects.create(cluster_id=1, medoid_vector=[0.1, 0.2, 0.3])
        self.job1 = Job.objects.create(job_id=101, title="AI Engineer", description="Work with AI", cluster=self.cluster1)
        self.job2 = Job.objects.create(job_id=102, title="Data Analyst", description="Analyze data", cluster=self.cluster1)

    def test_jobs_are_assigned_to_cluster(self):
        """
        Verify that jobs are correctly assigned to the cluster.
        """
        self.assertEqual(self.job1.cluster, self.cluster1)
        self.assertEqual(self.job2.cluster, self.cluster1)

    def test_medoid_assignment(self):
        """
        Ensure that the medoid job is correctly assigned to the cluster.
        """
        self.cluster1.medoid_job = self.job1
        self.cluster1.save()
        self.assertEqual(self.cluster1.medoid_job, self.job1)

#[1] - Writing and running tests: https://docs.djangoproject.com/en/5.1/topics/testing/overview/
