from django.shortcuts import render
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login
from .serializers import Users
from .models import CV, Job, Cluster, Recommendation
from rest_framework.decorators import api_view
from rest_framework import status
from backend1.documents import JobDocument
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth.hashers import make_password
from rest_framework.parsers import MultiPartParser, FormParser
from django.contrib.auth.models import User
import numpy as np
from sentence_transformers import SentenceTransformer
from sklearn.metrics.pairwise import cosine_similarity
import logging
from django.core.paginator import Paginator
from rest_framework.pagination import PageNumberPagination
from elasticsearch_dsl import Q
import math
from django.shortcuts import get_object_or_404
from PyPDF2 import PdfReader
import pdfplumber
from django.db.models import Count
import os


#load SBERT model
sbert_model = SentenceTransformer("all-MiniLM-L6-v2")
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)


class RegisterUser(APIView):
    def post(self, request):
        serializers = Users(data=request.data)
        if serializers.is_valid():
            serializers.save()
            return Response({'message': 'User created successfully'}, status=status.HTTP_201_CREATED)
        else:
            return Response(serializers.errors, status=status.HTTP_400_BAD_REQUEST)


class LoginUser(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(request, username=username, password=password)
        if user is not None:
            login(request, user)
            # Return both a message and the username
            return Response({
                'message': 'Login successful',
                'username': user.username
            }, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid username or password'}, status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
def search_jobs(request):
    q = request.GET.get('q', '')
    if not q:
        return Response({"results": [], "total_results": 0, "total_pages": 0, "current_page": 1})

    # Build Elasticsearch query
    search = JobDocument.search().query(
        "multi_match",
        query=q,
        fields=["title", "description", "company_title", "location"]
    )

    # Apply filters
    med_salary_min = request.GET.get('med_salary_min')
    med_salary_max = request.GET.get('med_salary_max')
    if med_salary_min:
        search = search.filter("range", med_salary={"gte": int(med_salary_min)})
    if med_salary_max:
        search = search.filter("range", med_salary={"lte": int(med_salary_max)})

    pay_period = request.GET.get('pay_period')
    if pay_period:
        search = search.filter("term", pay_period=pay_period)

    work_type = request.GET.get('work_type')
    if work_type:
        search = search.filter("term", work_type=work_type)

    # Salary filter to ensure only jobs with salaries are returned
    search = search.filter(
        "bool",
        should=[
            {"range": {"max_salary": {"gt": 0}}},
            {"range": {"med_salary": {"gt": 0}}}
        ],
        minimum_should_match=1
    )

    # Pagination
    try:
        page = int(request.GET.get('page', 1))
    except ValueError:
        page = 1

    try:
        page_size = int(request.GET.get('page_size', 10))
    except ValueError:
        page_size = 30

    # Elasticsearch pagination: Use `from` and `size`
    offset = (page - 1) * page_size
    search = search[offset: offset + page_size]

    # Execute the search query
    response = search.execute()

    # Get the total number of hits from Elasticsearch
    total_hits = (
        response.hits.total.value if hasattr(response.hits.total, 'value')
        else response.hits.total
    )
    
    # Calculate total pages
    total_pages = (total_hits + page_size - 1) // page_size  # Ceiling division

    # Cap total pages
    max_pages = 50
    total_pages = min(total_pages, max_pages)

    # Format results
    results = []
    for hit in response:
        results.append({
            'job_id': hit.job_id,
            'title': hit.title,
            'company_title': hit.company_title,
            'location': hit.location,
            'description': hit.description,
            'med_salary': hit.med_salary,
            'formatted_skills_desc': hit.formatted_skills_desc,
            'pay_period': hit.pay_period,
            'max_salary': hit.max_salary,
            'work_type': hit.work_type,
        })

    return Response(
        {
            "results": results,
            "total_results": total_hits,
            "total_pages": total_pages,
            "current_page": page,
        },
        status=status.HTTP_200_OK
    )



@api_view(['GET'])
def account_details(request):
    username = request.query_params.get('username')
    if not username:
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)
    try:
        user = User.objects.get(username=username)
    except User.DoesNotExist:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    cv_url = ""
    try:
        cv = CV.objects.get(user=user)
        cv_url = cv.cv_file.url
    except CV.DoesNotExist:
        cv_url = ""

    return Response({
        'message': 'Account details retrieved successfully.',
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff,
        'cv': cv_url,
    }, status=status.HTTP_200_OK)


@api_view(['PUT'])
def account_update(request):
    """
    Updates the authenticated user's account information.
    Accepts new values for 'username', 'email', and optionally 'password'.
    Returns the updated username, email, and staff status as top-level keys.
    """
    username = request.data.get('username')
    if not username:
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(username=username).first()
    if not user:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    data = request.data

    user.email = data.get('email', user.email)

    new_password = data.get('password')
    if new_password:
        user.password = make_password(new_password)

    user.save()

    return Response({
        'message': 'Account updated successfully.',
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff,
    }, status=status.HTTP_200_OK)



@api_view(['GET'])
def check_cv(request):
    """Checks if a user has already uploaded a CV."""
    username = request.query_params.get("username")

    if not username:
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)

    user = User.objects.filter(username=username).first()
    if not user:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    has_cv = CV.objects.filter(user=user).exists()
    return Response({'has_cv': has_cv}, status=status.HTTP_200_OK)

@api_view(['POST'])
@parser_classes([MultiPartParser, FormParser])
def upload_cv(request):
    """Handles CV upload, extracts text, vectorizes it, assigns to cluster, and saves recommendations."""
    logger.info(" Received a CV upload request...")

    # Debugging request payload
    logger.info(f" Request DATA: {request.data}")
    logger.info(f" Request FILES: {request.FILES}")

    username = request.data.get("username")
    cv_file = request.FILES.get("cv_file")

    # Validate username
    if not username:
        logger.error(" Missing username in request.")
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Validate user exists
    try:
        user = User.objects.get(username=username)
        logger.info(f" Found user: {username}")
    except User.DoesNotExist:
        logger.error(" User not found in database.")
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Validate CV file
    if not cv_file:
        logger.error(" No CV file uploaded.")
        return Response({'error': 'No CV file uploaded'}, status=status.HTTP_400_BAD_REQUEST)

    if not cv_file.name.endswith(".pdf"):
        logger.error(" Invalid file type. Only PDFs are allowed.")
        return Response({'error': 'Only PDF files are allowed'}, status=status.HTTP_400_BAD_REQUEST)

    # 🔹 Manually Save the CV File (Bypass Serializer)
    try:
        existing_cv = CV.objects.filter(user=user).first()
        if existing_cv:
            existing_cv.cv_file.delete(save=False)  # Delete old file
            existing_cv.cv_file = cv_file  # Replace with new one
            existing_cv.save()
            logger.info(" Existing CV replaced with new one.")
        else:
            new_cv = CV(user=user, cv_file=cv_file)
            new_cv.save()
            logger.info(" New CV successfully saved.")

    except Exception as e:
        logger.error(f" Failed to save CV: {str(e)}")
        return Response({'error': 'Failed to save CV'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    #  Extract Text from PDF
    try:
        with pdfplumber.open(cv_file) as pdf:
            cv_text = "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
        logger.info(f" Extracted CV text: {cv_text[:300]}... (truncated)")
    except Exception as e:
        logger.error(f" Error extracting text from PDF: {str(e)}")
        return Response({'error': 'Failed to extract text from CV'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    #  Vectorize CV using SBERT
    try:
        cv_vector = sbert_model.encode(cv_text).tolist()
        logger.info(" CV successfully vectorized.")
    except Exception as e:
        logger.error(f" Error vectorizing CV: {str(e)}")
        return Response({'error': 'Failed to vectorize CV'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    #  Assign CV to the Closest Cluster
    medoid_jobs = Job.objects.filter(is_medoid=True)
    if not medoid_jobs.exists():
        logger.error(" No medoid jobs found! Clustering has not been run.")
        return Response({'error': 'No medoids found! Run clustering first.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    logger.info(f" Found {medoid_jobs.count()} medoid jobs. Computing closest cluster...")

    # Compute similarity between CV and medoid vectors
    medoid_vectors = np.array([np.array(job.vector) for job in medoid_jobs])
    similarities = cosine_similarity([cv_vector], medoid_vectors)[0]

    # Log similarities for debugging
    logger.info(" Distances to each cluster medoid:")
    cluster_similarities = {}
    for idx, job in enumerate(medoid_jobs):
        similarity_score = similarities[idx]
        cluster_similarities[job.cluster.cluster_id] = similarity_score
        logger.info(f" Cluster {job.cluster.cluster_id}: Similarity = {similarity_score:.4f}")

    # Find the best cluster
    best_cluster_id = max(cluster_similarities, key=cluster_similarities.get)
    best_cluster = Cluster.objects.get(cluster_id=best_cluster_id)
    logger.info(f" CV assigned to Cluster {best_cluster.cluster_id}")

    #  Get Jobs from Assigned Cluster
    jobs_in_cluster = Job.objects.filter(cluster=best_cluster)
    if not jobs_in_cluster.exists():
        logger.warning("⚠ No jobs found in assigned cluster.")
        return Response({'error': 'No jobs found in assigned cluster.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    logger.info(f" Found {jobs_in_cluster.count()} jobs in the assigned cluster. Calculating similarity...")

    # Compute similarity between CV and all job vectors in the cluster
    job_vectors = np.array([np.array(job.vector) for job in jobs_in_cluster if job.vector])
    job_ids = [job.job_id for job in jobs_in_cluster]

    job_similarities = cosine_similarity([cv_vector], job_vectors)[0]
    top_k_indices = np.argsort(job_similarities)[-10:][::-1]  # Get top 10 closest jobs

    recommended_jobs = Job.objects.filter(job_id__in=[job_ids[i] for i in top_k_indices])
    job_data = [
    {
        "job_id": job.job_id,
        "title": job.title,
        "company_title": job.company_title,
        "location": job.location,
        "description": job.description,
        "med_salary": job.med_salary,
        "formatted_skills_desc": job.formatted_skills_desc,
        "pay_period": job.pay_period,
        "max_salary": job.max_salary,
        "work_type": job.work_type,
    }
    for job in recommended_jobs
    ]

    logger.info(f" Found {len(recommended_jobs)} recommended jobs.")

    # Save Recommendations
    Recommendation.objects.filter(user=user).delete()  # Remove old recommendations
    for job in recommended_jobs:
        Recommendation.objects.create(user=user, job=job)

    logger.info(" Recommendations successfully saved.")

    return Response({
        'message': 'CV uploaded successfully!',
        'recommended_jobs': job_data
    }, status=status.HTTP_201_CREATED)




@api_view(['GET'])
def get_saved_recommendations(request):
    """Retrieve saved job recommendations for a user."""
    username = request.query_params.get("username")

    if not username:
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Validate user exists
    user = User.objects.filter(username=username).first()
    if not user:
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Retrieve saved recommendations
    recommendations = Recommendation.objects.filter(user=user)
    if not recommendations.exists():
        return Response({'recommended_jobs': []}, status=status.HTTP_200_OK)

    # Format job data
    job_data = [
    {
        "job_id": rec.job.job_id,
        "title": rec.job.title,
        "company_title": rec.job.company_title,
        "location": rec.job.location,
        "description": rec.job.description,
        "med_salary": rec.job.med_salary,
        "formatted_skills_desc": rec.job.formatted_skills_desc,
        "pay_period": rec.job.pay_period,
        "max_salary": rec.job.max_salary,
        "work_type": rec.job.work_type,
    }
    for rec in recommendations
    ]

    return Response({'recommended_jobs': job_data}, status=status.HTTP_200_OK)


@api_view(['GET'])
def get_more_recommendations(request):
    """Handles pagination for loading more job recommendations."""
    logger.info(" Received a Load More request...")

    username = request.GET.get("username")
    offset = int(request.GET.get("offset", 0))

    if not username:
        logger.error(" Missing username in request.")
        return Response({'error': 'Username is required'}, status=status.HTTP_400_BAD_REQUEST)

    # Validate user
    try:
        user = User.objects.get(username=username)
        logger.info(f" Found user: {username}")
    except User.DoesNotExist:
        logger.error(" User not found in database.")
        return Response({'error': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    # Get assigned cluster
    assigned_cluster = Cluster.objects.filter(jobs__recommendation__user=user).distinct().first()
    if not assigned_cluster:
        logger.error(" No cluster found for user recommendations.")
        return Response({'error': 'No cluster found for user.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    logger.info(f" Found assigned cluster: {assigned_cluster.cluster_id}")

    # Get jobs from the cluster
    jobs_in_cluster = Job.objects.filter(cluster=assigned_cluster)

    if not jobs_in_cluster.exists():
        logger.warning("⚠ No jobs found in assigned cluster.")
        return Response({'error': 'No jobs found in assigned cluster.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    logger.info(f" Found {jobs_in_cluster.count()} jobs in the assigned cluster.")

    # Extract CV vector for similarity calculation
    user_cv = CV.objects.filter(user=user).first()
    if not user_cv or not user_cv.cv_file:
        logger.error(" No CV found for user.")
        return Response({'error': 'No CV found.'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        with pdfplumber.open(user_cv.cv_file) as pdf:
            cv_text = "\n".join([page.extract_text() for page in pdf.pages if page.extract_text()])
        logger.info(f" Extracted CV text for load more: {cv_text[:300]}... (truncated)")
    except Exception as e:
        logger.error(f" Error extracting text from CV: {str(e)}")
        return Response({'error': 'Failed to extract text from CV'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    try:
        cv_vector = sbert_model.encode(cv_text).tolist()
        logger.info(" CV successfully vectorized for Load More.")
    except Exception as e:
        logger.error(f" Error vectorizing CV: {str(e)}")
        return Response({'error': 'Failed to vectorize CV'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

    # Compute similarity
    job_vectors = np.array([np.array(job.vector) for job in jobs_in_cluster if job.vector])
    job_ids = [job.job_id for job in jobs_in_cluster]

    job_similarities = cosine_similarity([cv_vector], job_vectors)[0]
    sorted_indices = np.argsort(job_similarities)[::-1]  # Sort by highest similarity
    top_k_indices = sorted_indices[offset:offset + 10]  # Get next 10 jobs

    recommended_jobs = Job.objects.filter(job_id__in=[job_ids[i] for i in top_k_indices])
    job_data = [
        {
            "job_id": job.job_id,
            "title": job.title,
            "company_title": job.company_title,
            "location": job.location,
            "description": job.description,
            "med_salary": job.med_salary,
            "formatted_skills_desc": job.formatted_skills_desc,
            "pay_period": job.pay_period,
            "max_salary": job.max_salary,
            "work_type": job.work_type,
        }
        for job in recommended_jobs
    ]

    logger.info(f" Found {len(recommended_jobs)} more jobs.")

    return Response({'recommended_jobs': job_data}, status=status.HTTP_200_OK)

# References:
# [1] - Django REST framework & APIview: https://www.django-rest-framework.org/api-guide/views/
# [2] - authenticate and login: https://docs.djangoproject.com/en/stable/topics/auth/default/
# [3] - Elasticsearch DSL & Multi Match Query: https://elasticsearch-dsl.readthedocs.io/en/latest/
# [4] - Sentence Transformers: https://www.sbert.net/
# [5] - Scikit-learn and cosine_similarity: https://scikit-learn.org/stable/modules/generated/sklearn.metrics.pairwise.cosine_similarity.html
# [6] - pdfplumber: https://stackoverflow.com/questions/62805973/how-do-i-extract-all-of-the-text-from-a-pdf-using-indexing
# [7] - PyPDF2 documentation: https://pypi.org/project/PyPDF2/