import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar2 from "./Navbar2";
import JobCard from "./JobCard";
import transition from "./Transition";

function UploadCV() {
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem("username");

  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("");
  const [recommendedJobs, setRecommendedJobs] = useState([]);
  const [hasUploadedCV, setHasUploadedCV] = useState(false);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const recPerPage = 10;

  // Check if user is logged in and has a CV
  useEffect(() => {
    if (!storedUsername) {
      navigate("/login");
    } else {
      checkUserCV();
      fetchSavedRecommendations();
    }
  }, [storedUsername, navigate]);

  // Check if user already has a CV uploaded
  const checkUserCV = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/check-cv/?username=${storedUsername}`
      );
      const data = await response.json();
      if (response.ok && data.has_cv) {
        setHasUploadedCV(true);
      }
    } catch (error) {
      console.error("Error checking CV status:", error);
    }
  };

  // Fetch initial (saved) recommendations
  const fetchSavedRecommendations = async () => {
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/get-more-recommendations/?username=${storedUsername}&offset=0`
      );
      const data = await response.json();
      if (response.ok) {
        setRecommendedJobs(data.recommended_jobs || []);
        setOffset(10); // Next batch starts at 10
      }
    } catch (error) {
      console.error("Error fetching recommendations:", error);
    }
  };

  // Fetch next batch of recommendations
  const loadMoreRecommendations = async () => {
    if (loading) return;  // Prevent multiple simultaneous requests
    setLoading(true);      // Show loader
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/api/get-more-recommendations/?username=${storedUsername}&offset=${offset}`
      );
      const data = await response.json();
      if (response.ok) {
        setRecommendedJobs((prevJobs) => [...prevJobs, ...data.recommended_jobs]);
        setOffset((prevOffset) => prevOffset + 10);
      }
    } catch (error) {
      console.error("Error loading more recommendations:", error);
    }
    setLoading(false); // Hide loader
  };

  // Handle file selection
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile && selectedFile.type !== "application/pdf") {
      setMessage("Only PDF files are allowed!");
      setFile(null);
      return;
    }
    setFile(selectedFile);
  };

  // Upload the CV
  const handleUpload = async () => {
    if (!file) {
      setMessage("Please select a file first.");
      return;
    }

    setLoading(true); // Show loader while uploading

    const formData = new FormData();
    formData.append("cv_file", file);
    formData.append("username", storedUsername);

    try {
      const response = await fetch("http://127.0.0.1:8000/api/upload-cv/", {
        method: "POST",
        body: formData,
      });
      const data = await response.json();

      if (response.ok) {
        setMessage("CV uploaded successfully!");
        setRecommendedJobs(data.recommended_jobs || []);
        setHasUploadedCV(true);
        setOffset(10); // Start next offset
      } else {
        setMessage(data.error || "Failed to upload CV.");
      }
    } catch (error) {
      setMessage("An error occurred. Please try again.");
    }

    setLoading(false); // Hide loader after completion
  };

  return (
    <div className="min-h-screen bg-white flex flex-col relative">
      {/* Loader Overlay */}
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-white bg-opacity-75 z-50">
          <div className="loader"></div>
        </div>
      )}

      <Navbar2 />

      {/* Page Heading */}
      <div className="text-center mt-8">
        <p className="mt-2 text-lg text-gray-600">
          Get personalized job recommendations instantly!
        </p>
      </div>

      {/* CV Upload Card */}
      <div className="flex-grow flex items-center justify-center">
        <div className="w-full max-w-lg p-8 bg-white mt-0 shadow-xl rounded-lg">
          <h2 className="text-3xl font-extrabold text-gray-800 mb-6 text-center">
            {hasUploadedCV ? "Replace Your CV" : "Upload Your CV"}
          </h2>

          {hasUploadedCV && (
            <p className="text-blue-600 text-center mb-4">
              You have already uploaded a CV. Uploading a new one will replace the old CV.
            </p>
          )}

          <div className="flex flex-col items-center">
            <input
              type="file"
              onChange={handleFileChange}
              accept=".pdf"
              className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleUpload}
              className="mt-4 w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors"
            >
              {hasUploadedCV ? "Replace CV" : "Upload CV"}
            </button>
            {message && (
              <p className="text-green-600 font-medium mt-4 text-center">
                {message}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Recommended Jobs Section */}
      {recommendedJobs.length > 0 && (
        <div className="max-w-6xl mx-8 mt-10 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="text-2xl font-bold text-gray-800 mb-4 text-center">
            We recommended these jobs
          </h2>
          <ul className="space-y-4">
            {recommendedJobs.map((job) => (
              <li key={job.job_id}>
                <JobCard job={job} />
              </li>
            ))}
          </ul>
          {recommendedJobs.length >= offset && (
            <div className="flex justify-center mt-8">
              <button
                onClick={loadMoreRecommendations}
                className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
              >
                {loading ? "Loading..." : "Load More Jobs"}
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default transition(UploadCV);
