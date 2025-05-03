import logging
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from backend1.documents import JobDocument
from backend1.serializers import JobSerializer, RecommendationSerializer
from backend1.models import Recommendation, Job
from django.contrib.auth.models import User
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

logger = logging.getLogger(__name__)


class JobDocumentView(DocumentViewSet):
    """
    A Django REST Framework viewset that integrates with Elasticsearch to search for jobs.
        document (Elasticsearch Document):
            The Elasticsearch document class (`JobDocument`) that maps to the job model.
        serializer_class (Serializer):
            The serializer (`JobSerializer`) for parsing and formatting the job data.
        lookup_field (str):
            The field used to look up documents (default: 'job_id').
        filter_fields (dict):
            Defines which fields can be filtered in search queries.
        search_fields (tuple):
            Specifies the fields used for text-based searches (title, description, etc.).
        ordering_fields (dict):
            Indicates which fields can be used for ordering the search results.
    """

    document = JobDocument
    serializer_class = JobSerializer
    lookup_field = 'job_id'
    filter_fields = {
        'title': {'field': 'title', 'lookups': ['match', 'icontains']},
        'description': {'field': 'description', 'lookups': ['match', 'icontains']},
    }
    search_fields = ('title', 'description', 'company_title', 'location',)
    ordering_fields = {
        'med_salary': None,
        'max_salary': None,
    }


@api_view(['GET'])
def get_recommendations(request, username):
    """
    This function checks whether a user with the specified username exists and, if so,
    fetches any saved job recommendations associated with that user. If the user is not
    found or no recommendations are available, an appropriate message or error is returned.

    """

    logger.info(f" Received request for recommendations of user: {username}")

    # Check if the user exists
    user = User.objects.filter(username=username).first()
    if not user:
        logger.error(f"User '{username}' not found.")
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Retrieve recommendations for the user
    recommendations = Recommendation.objects.filter(user=user).select_related('job')
    if not recommendations.exists():
        logger.warning(f" No recommendations found for user: {username}")
        return Response({'message': 'No recommendations found.'}, status=status.HTTP_200_OK)

    # Serialize and return recommendations
    serialized_data = RecommendationSerializer(recommendations, many=True).data
    logger.info(f"Returning {len(serialized_data)} recommendations for user: {username}")

    return Response({'recommendations': serialized_data}, status=status.HTTP_200_OK)
