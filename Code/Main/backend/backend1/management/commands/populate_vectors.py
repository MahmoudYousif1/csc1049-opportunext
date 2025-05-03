import django
import sys
import os
import numpy as np
import pandas as pd
from sentence_transformers import SentenceTransformer
from django.core.management.base import BaseCommand
from backend1.models import Job
from django.db.models.signals import pre_save, post_save


class Command(BaseCommand):
    """
    Populates job vectors by computing SBERT embeddings for job descriptions.
    It disables signals, loads the dataset, generates embeddings, and updates Job records in the database.
    """
    help = "Populate job vectors using SBERT"

    def handle(self, *args, **kwargs):
        """
        Reads job descriptions from a CSV file, generates embeddings with SBERT, and bulk-updates Job records.
        It also disables Elasticsearch signals to prevent side effects during the update process.
        """
        # Disable Elasticsearch Signals
        pre_save.receivers = []
        post_save.receivers = []

        # Load SBERT model
        self.stdout.write(" Loading SBERT model...")
        sbert_model = SentenceTransformer("all-MiniLM-L6-v2")
        self.stdout.write(" SBERT model loaded!")

        # Load the trimmed dataset
        dataset_path = os.path.join(os.path.dirname(__file__), "../../../dataset/postings.csv")
        if not os.path.exists(dataset_path):
            self.stderr.write(f" Dataset file not found: {dataset_path}")
            return

        df = pd.read_csv(dataset_path)

        # Create a dictionary {job_id: description}
        job_desc_dict = dict(zip(df["job_id"], df["description"].fillna("No description available")))

        # Fetch all jobs from the database
        jobs = Job.objects.all()
        self.stdout.write(f" Found {jobs.count()} jobs in the database.")

        # Match jobs in DB with descriptions using `job_id`
        matched_jobs = []
        job_descriptions = []

        for job in jobs:
            if job.job_id in job_desc_dict:
                matched_jobs.append(job)
                job_descriptions.append(job_desc_dict[job.job_id])  # Get the correct description

        self.stdout.write(f" Matched {len(matched_jobs)} jobs with descriptions.")

        # Convert matched descriptions to embeddings
        self.stdout.write(" Generating embeddings...")
        job_embeddings = sbert_model.encode(job_descriptions, convert_to_numpy=True)

        # Assign embeddings to jobs
        for job, embedding in zip(matched_jobs, job_embeddings):
            job.vector = embedding.tolist()

        # Bulk update to store embeddings in the database
        Job.objects.bulk_update(matched_jobs, ["vector"], batch_size=5000)
        self.stdout.write(f" Successfully updated {len(matched_jobs)} jobs with embeddings!")
