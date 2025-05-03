from django.db import models
from django.contrib.auth.models import User
import numpy as np

class CV(models.Model):
    """ Stores uploaded CV files and their vectorized representations. """
    user = models.OneToOneField(User, on_delete=models.CASCADE)  # Each user has one CV
    cv_file = models.FileField(upload_to="cvs/")  # Saves the uploaded file
    cv_vector = models.JSONField(null=True, blank=True)  # Store the vectorized representation

    def __str__(self):
        return f"CV of {self.user.username}"

class Cluster(models.Model):
    """ Represents clusters with their medoid jobs. """
    cluster_id = models.IntegerField(unique=True)  # Unique cluster identifier (e.g., 0,1,2,..., k)
    medoid_vector = models.JSONField()  # Stores the medoid embedding as a JSON-friendly list of floats
    medoid_job = models.OneToOneField(
        "Job", on_delete=models.SET_NULL, null=True, blank=True, related_name="medoid_for_cluster"
    )  # Links to the medoid job representing this cluster

    def set_medoid_vector(self, embedding):
        """ Store medoid embedding as a list of floats (JSON-friendly format). """
        self.medoid_vector = list(map(float, embedding))

    def get_medoid_vector(self):
        """ Retrieve medoid vector as a NumPy array. """
        return np.array(self.medoid_vector)

    def __str__(self):
        return f"Cluster {self.cluster_id} (Medoid: {self.medoid_job.title if self.medoid_job else 'None'})"

class Job(models.Model):
    """ Stores job postings and their vector representations. """
    job_id = models.BigIntegerField(primary_key=True)
    cluster = models.ForeignKey(Cluster, on_delete=models.SET_NULL, null=True, blank=True, related_name="jobs")  
    company_title = models.CharField(max_length=255, blank=True, null=True)
    title = models.CharField(max_length=255, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    max_salary = models.IntegerField(blank=True, null=True)
    pay_period = models.CharField(max_length=50, blank=True, null=True)
    location = models.CharField(max_length=255, blank=True, null=True)
    company_views = models.IntegerField(blank=True, null=True)

    med_salary = models.IntegerField(blank=True, null=True)
    min_salary = models.IntegerField(blank=True, null=True)
    formatted_applies = models.CharField(max_length=50, blank=True, null=True)
    original_list = models.BigIntegerField(blank=True, null=True)
    remote_all = models.FloatField(blank=True, null=True)
    job_postin = models.URLField(max_length=500, blank=True, null=True)
    application = models.CharField(max_length=255, blank=True, null=True)
    expiry = models.BigIntegerField(blank=True, null=True)

    closed_tim = models.BigIntegerField(blank=True, null=True)
    formatted_skills_desc = models.TextField(blank=True, null=True)
    listed_time = models.BigIntegerField(blank=True, null=True)
    posting_dc = models.BigIntegerField(blank=True, null=True)
    sponsored = models.IntegerField(blank=True, null=True)
    work_type = models.CharField(max_length=50, blank=True, null=True)
    currency = models.CharField(max_length=10, blank=True, null=True)
    compensation = models.CharField(max_length=50, blank=True, null=True)
    normalized = models.IntegerField(blank=True, null=True)
    zip_code = models.IntegerField(blank=True, null=True)
    fips = models.IntegerField(blank=True, null=True)

    vector = models.JSONField(null=True, blank=True)
    is_medoid = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.title or 'Untitled'} at {self.company_title or 'Unknown'}"

    def get_vector(self):
        """ Retrieve job vector as a NumPy array. """
        return np.array(self.vector) if self.vector else None
    

class Recommendation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user.username} → {self.job.title}"

#[1] - uploading csv to backend: https://www.youtube.com/watch?v=vs6dXL9Wp7s
