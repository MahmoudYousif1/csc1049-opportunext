from django.test import TestCase
from elasticsearch_dsl import connections #[1]
from backend1.documents import JobDocument

class ElasticsearchTest(TestCase):
    """
    Test case for verifying the connection to Elasticsearch and the existence of job indices.
    """

    def setUp(self):
        """
        Set up an Elasticsearch connection for testing.
        """
        self.connection = connections.create_connection()

    def test_elasticsearch_connection(self):
        """
        Verifying that the Elasticsearch server is reachable.
        """
        self.assertTrue(self.connection.ping(), "Elasticsearch server is not reachable")

    def test_job_index_exists(self):
        """
        Check if the job index exists in Elasticsearch.
        """
        index_exists = JobDocument._index.exists()
        self.assertTrue(index_exists, "Job index does not exist in Elasticsearch")

#[1] - Using connection in Elasticsearch: https://elasticsearch-dsl.readthedocs.io/en/stable/configuration.html