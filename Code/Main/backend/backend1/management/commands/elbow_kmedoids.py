import numpy as np
import random
import matplotlib.pyplot as plt
from sklearn_extra.cluster import KMedoids
from django.core.management.base import BaseCommand
from sklearn.metrics import pairwise_distances
from backend1.models import Job


class Command(BaseCommand):
    """Django management command to cluster job embeddings using K-Medoids and determine optimal k via the Elbow method."""

    def handle(self, *args, **kwargs):
        """Fetches job embeddings from the database, samples 20,000 jobs, computes pairwise cosine distances in batches, and runs K-Medoids clustering for k=2 to k=20 while plotting the Elbow method graph; exits if fewer than 20,000 embeddings are available."""
        self.stdout.write(" Fetching job embeddings from database...")
        
        # Load job embeddings from the database
        jobs = Job.objects.exclude(vector__isnull=True).order_by("job_id")

        # Ensure we have enough embeddings
        if len(jobs) < 20000:
            self.stderr.write(f" Not enough jobs! Found {len(jobs)}, but need at least 20,000. Exiting...")
            return

        # Select 20,000 random jobs
        sampled_jobs = random.sample(list(jobs), 20000)
        job_vectors = np.array([job.vector for job in sampled_jobs], dtype=np.float32)  # Reduce memory usage

        self.stdout.write(f" Selected {job_vectors.shape[0]} random job embeddings.")

        # Define range of k values to test
        k_values = list(range(2, 21))  # Testing k=2 to k=20
        costs = []  # Store clustering costs for each k
        percent_drops = []  # Store percentage cost drop per k

        def batch_pairwise_distances(X, batch_size=5000):
            """Computes the pairwise cosine distance matrix in batches to avoid memory overload and returns the full distance matrix; batch_size controls the number of samples processed per chunk."""
            num_samples = X.shape[0]
            distance_matrix = np.zeros((num_samples, num_samples), dtype=np.float32)

            for i in range(0, num_samples, batch_size):
                batch_end = min(i + batch_size, num_samples)
                self.stdout.write(f" Computing distances for batch {i} to {batch_end}...")
                distance_matrix[i:batch_end, :] = pairwise_distances(
                    X[i:batch_end], X, metric="cosine"
                )

            return distance_matrix

        self.stdout.write(" Computing pairwise distances in batches...")
        distance_matrix = batch_pairwise_distances(job_vectors)
        self.stdout.write(" Distance matrix computed.")

        # Run K-Medoids for each k and compute cost
        for k in k_values:
            self.stdout.write(f" Running K-Medoids for k={k}...")

            kmedoids = KMedoids(n_clusters=k, metric="precomputed", random_state=42)
            labels = kmedoids.fit_predict(distance_matrix)

            # Correct cost calculation (sum of distances to closest medoid)
            cost = np.sum(np.min(distance_matrix[:, kmedoids.medoid_indices_], axis=1))
            costs.append(cost)

            # Compute percentage drop from previous k
            if len(costs) > 1:
                drop = ((costs[-2] - cost) / costs[-2]) * 100
                percent_drops.append(drop)
            else:
                percent_drops.append(0)

            # Count number of jobs per cluster
            cluster_sizes = {i: np.sum(labels == i) for i in range(k)}
            self.stdout.write(f" Cluster sizes for k={k}: {cluster_sizes}")

        # Plot Elbow Method Graph
        plt.figure(figsize=(10, 5))

        # First plot: Cost vs k (log scale)
        plt.subplot(1, 2, 1)
        plt.plot(k_values, costs, marker="o", linestyle="-", color="b")
        plt.xlabel("Number of Clusters (k)")
        plt.ylabel("Cost (Sum of Distances)")
        plt.title("Elbow Method for Optimal k (K-Medoids)")
        plt.yscale("log")  # Log scale to reveal elbow

        # Second plot: % Cost Drop vs k
        plt.subplot(1, 2, 2)
        plt.plot(k_values, percent_drops, marker="o", linestyle="-", color="g")
        plt.xlabel("Number of Clusters (k)")
        plt.ylabel("Percentage Cost Drop")
        plt.title("Cost Reduction per k (K-Medoids)")
        plt.axvline(x=k_values[np.argmax(percent_drops)], color="red", linestyle="--", label="Largest Drop")
        plt.legend()

        # Show plot
        plt.tight_layout()
        plt.show()

        self.stdout.write("\n Elbow method complete! No data was saved.")
