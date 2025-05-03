import os
import pickle
import numpy as np
from django.core.management.base import BaseCommand
from backend1.models import Job, Cluster


class Command(BaseCommand):
    """
    Populates clusters in the database using precomputed k-medoids clustering results.
    It loads job-cluster mappings and medoid job IDs from pickle files and updates the Job and Cluster objects accordingly.
    """
    help = "Populate clusters using k-medoids clustering results"

    def handle(self, *args, **kwargs):
        """
        Executes the cluster population process by reading cluster assignment files and updating database records.
        It assigns each job to its respective cluster and marks medoid jobs based on the loaded mappings.
        """
        self.stdout.write(" Starting cluster population process...")

        # Load saved cluster assignments from the `.pkl` file
        dataset_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../dataset")
        cluster_file = os.path.join(dataset_path, "kmedoids_clusters.pkl")
        medoid_file = os.path.join(dataset_path, "kmedoids_medoids.pkl")

        self.stdout.write(" Loading cluster assignment files...")

        try:
            with open(cluster_file, "rb") as f:
                job_cluster_mapping = pickle.load(f)  # { job_id: cluster_id }

            with open(medoid_file, "rb") as f:
                medoid_job_mapping = pickle.load(f)  # { cluster_id: medoid_job_id }

            self.stdout.write(f" Loaded {len(job_cluster_mapping)} job-cluster mappings.")
            self.stdout.write(f" Loaded {len(medoid_job_mapping)} medoid job mappings.")

        except FileNotFoundError as e:
            self.stderr.write(f" Error loading cluster files: {str(e)}")
            return

        #  Assign jobs to clusters
        for cluster_id, medoid_job_id in medoid_job_mapping.items():
            cluster, _ = Cluster.objects.get_or_create(cluster_id=cluster_id)

            #  Assign Medoid Job
            medoid_job = Job.objects.filter(job_id=medoid_job_id).first()
            if medoid_job:
                cluster.medoid_job = medoid_job
                cluster.set_medoid_vector(medoid_job.vector)  # Set the medoid vector
                cluster.save()
                medoid_job.is_medoid = True  # Mark it as a medoid
                medoid_job.cluster = cluster  # Ensures medoid is assigned to its own cluster
                medoid_job.save()

            #  Assign all jobs belonging to this cluster **individually**
            assigned_jobs = 0
            for job_id, cid in job_cluster_mapping.items():
                if cid == cluster_id:
                    job = Job.objects.filter(job_id=job_id).first()
                    if job:
                        job.cluster = cluster  # Assign cluster to job
                        job.save()  # Explicitly save
                        assigned_jobs += 1

            self.stdout.write(f" Cluster {cluster_id} assigned {assigned_jobs} jobs.")

        self.stdout.write(" Cluster population complete.")
