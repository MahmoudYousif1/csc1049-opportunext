import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar2 from './Navbar2';
import transition from './Transition';

function SearchResults() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [totalResults, setTotalResults] = useState(0);
  const [searchParams] = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const query = searchParams.get('query') || '';
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    async function fetchJobs() {
      if (!query) return;

      setLoading(true);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/search_jobs/?q=${query}&page=${currentPage}&page_size=${jobsPerPage}`
        );
        const data = await response.json();

        if (data.results.length > 0) {
          setJobs((prevJobs) => [...prevJobs, ...data.results]); // Append new results
          setTotalResults(data.total_results);
        }

        //  Corrected `hasMore` logic
        setHasMore(jobs.length + data.results.length < data.total_results);

        console.log("Pagination Debug:", {
          resultsLength: data.results.length,
          totalResults: data.total_results,
          currentPage: data.current_page,
          hasMore: jobs.length + data.results.length < data.total_results
        });

      } catch (error) {
        console.error('Error fetching search results:', error);
      } finally {
        setLoading(false);
      }
    }

    fetchJobs();
  }, [query, currentPage]);

  const loadMore = () => {
    if (hasMore) {
      setCurrentPage((prevPage) => prevPage + 1);
    }
  };

  return (
    <>
      <Navbar2 />
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white shadow-lg rounded-lg p-6">
          <h1 className="text-3xl font-bold mb-6">
            Search Results for: <span className="text-blue-600">&ldquo;{query}&rdquo;</span>
          </h1>

          {loading && jobs.length === 0 ? (
            <div className="flex justify-center items-center py-10">
              <div className="loader"></div>
            </div>
          ) : jobs.length === 0 ? (
            <p className="text-gray-600">No jobs found.</p>
          ) : (
            <>
              <ul className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                {jobs.map((job) => (
                  <li key={job.job_id}>
                    <div className="border border-gray-200 rounded-lg p-5 bg-gray-50 hover:shadow-xl transition-shadow duration-300">
                      <h3 className="text-xl font-semibold text-gray-900">{job.title}</h3>
                      <p className="text-gray-700">{job.company_title || 'Unknown'} • {job.location}</p>
                      <p className="text-gray-600 text-sm">
                        {job.description ? `${job.description.substring(0, 120)}...` : 'No description available.'}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>

              {/* Load More Button (Appears when more jobs are available) */}
              {hasMore && (
                <div className="flex justify-center mt-8">
                  <button
                    onClick={loadMore}
                    className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                    disabled={loading}
                  >
                    {loading ? "Loading..." : "Load More Jobs"}
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default transition(SearchResults);
