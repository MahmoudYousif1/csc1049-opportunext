import numpy as np
from sklearn_extra.cluster import KMedoids
import pickle
import django
import os
from django.core.management.base import BaseCommand
from sklearn.metrics import pairwise_distances
from backend1.models import Job


class Command(BaseCommand):
    """
    Trains K-Medoids clustering on job embeddings and saves the results.
    This command fetches embeddings from the database, computes a pairwise distance matrix in batches, performs clustering, and writes the cluster mappings and medoid indices to pickle files.
    """
    help = "Train K-Medoids clustering on job embeddings and save results."

    def handle(self, *args, **kwargs):
        """
        Fetches job embeddings, performs K-Medoids clustering, and saves the clustering results.
        """
        self.stdout.write(self.style.SUCCESS(" Fetching job embeddings from database..."))
        
        jobs = Job.objects.exclude(vector__isnull=True).order_by("job_id")
        if not jobs.exists():
            self.stdout.write(self.style.ERROR(" No job embeddings found in the database! Exiting..."))
            return

        job_vectors = np.array([job.vector for job in jobs], dtype=np.float32)
        job_ids = [job.job_id for job in jobs]

        self.stdout.write(self.style.SUCCESS(f" Loaded {job_vectors.shape[0]} job embeddings from the database."))

        k_clusters = 10
        self.stdout.write(self.style.SUCCESS(f" Running K-Medoids clustering with k={k_clusters}..."))

        
        def batch_pairwise_distances(X, batch_size=5000):
            """
            Computes the pairwise cosine distance matrix for X in batches.
            This function processes the computation in chunks to reduce memory usage.
            """
            num_samples = X.shape[0]
            distance_matrix = np.zeros((num_samples, num_samples), dtype=np.float32)
            for i in range(0, num_samples, batch_size):
                batch_end = min(i + batch_size, num_samples)
                self.stdout.write(f" Computing distances for batch {i} to {batch_end}...")
                distance_matrix[i:batch_end, :] = pairwise_distances(X[i:batch_end], X, metric="cosine")
            return distance_matrix

        self.stdout.write(" Computing pairwise distances in batches...")
        distance_matrix = batch_pairwise_distances(job_vectors)
        self.stdout.write(self.style.SUCCESS(" Distance matrix computed."))

        clustering_model = KMedoids(n_clusters=k_clusters, metric="precomputed", random_state=42)
        labels = clustering_model.fit_predict(distance_matrix)
        self.stdout.write(self.style.SUCCESS(" K-Medoids clustering completed."))

        medoid_indices = clustering_model.medoid_indices_
        job_cluster_mapping = {job_ids[i]: labels[i] for i in range(len(job_ids))}
        medoid_job_mapping = {i: job_ids[medoid_indices[i]] for i in range(len(medoid_indices))}

        dataset_path = os.path.join(os.path.dirname(os.path.abspath(__file__)), "../../../dataset")
        os.makedirs(dataset_path, exist_ok=True)

        with open(os.path.join(dataset_path, "kmedoids_clusters.pkl"), "wb") as f:
            pickle.dump(job_cluster_mapping, f)

        with open(os.path.join(dataset_path, "kmedoids_medoids.pkl"), "wb") as f:
            pickle.dump(medoid_job_mapping, f)

        self.stdout.write(self.style.SUCCESS(f" Saved cluster assignments and medoids to '{dataset_path}/kmedoids_clusters.pkl' & '{dataset_path}/kmedoids_medoids.pkl'!"))

#[1] Sklearn_extra with K-medoids: https://scikit-learn-extra.readthedocs.io/en/stable/generated/sklearn_extra.cluster.KMedoids.html
