import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar2 from './Navbar2';
import transition from './Transition';
import SearchBar from './SearchBar';
import Previous from './Previous';
import JobCard from './JobCard';
import FooterSection from './FooterSection';

function MainHome2() {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.message);
  const username = location.state?.username;

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [previousSearches, setPreviousSearches] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);
  const [hasMore, setHasMore] = useState(true);
  const jobsPerPage = 10;

  const handleSearch = async (query) => {
    setSearchQuery(query);
    if (query.trim().length === 0) {
      setResults([]);
      return;
    }

    setPreviousSearches((prev) => {
      const newPrev = [...prev.filter((q) => q !== query), query];
      if (newPrev.length > 4) newPrev.shift();
      return newPrev;
    });

    setLoading(true);
    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search_jobs/?q=${query}&page=1&page_size=${jobsPerPage}`
      );
      const data = await response.json();

      if (data.results && Array.isArray(data.results)) {
        setResults(data.results);
        setTotalResults(data.total_results);
        setCurrentPage(1);
        setHasMore(data.results.length < data.total_results);
      } else {
        setResults([]);
        setHasMore(false);
      }
    } catch (error) {
      console.error('Error fetching search results:', error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (!hasMore) return;
    setLoading(true);

    try {
      const response = await fetch(
        `http://127.0.0.1:8000/search_jobs/?q=${searchQuery}&page=${currentPage + 1}&page_size=${jobsPerPage}`
      );
      const data = await response.json();

      if (data.results.length > 0) {
        setResults((prevResults) => [...prevResults, ...data.results]);
        setCurrentPage((prevPage) => prevPage + 1);
      }

      setHasMore(results.length + data.results.length < totalResults);
    } catch (error) {
      console.error('Error fetching more results:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white text-black scroll-smooth">
        <Navbar2 />

        {successMessage && (
          <div className="fixed top-4 left-1/2 transform -translate-x-1/2 bg-green-100 text-green-800 p-4 rounded shadow-lg max-w-md text-center">
            {successMessage}
          </div>
        )}

        <div className="py-20 px-8 text-center">
          <h1 className="text-8xl font-bold text-gray-800 mb-3">
            Upload your CV to view recommendations.
          </h1>
          <p className="text-lg text-gray-600 mb-6">
            Discover opportunities tailored for you.
            <a
              href="/upload-cv"
              className="ml-2 text-blue-600 underline hover:text-blue-800"
            >
              Upload CV
            </a>
          </p>
          <SearchBar onSearch={handleSearch} externalQuery={searchQuery} />
        </div>

        {searchQuery && (
          <div className="max-w-6xl mx-auto bg-white text-black rounded p-6 mt-6 shadow">
            <h1 className="text-2xl font-bold mb-4">
              Search Results for: "<span className="text-blue-600">{searchQuery}</span>"
            </h1>
            {loading && results.length === 0 ? (
              <div className="flex justify-center items-center">
                <div className="loader"></div>
              </div>
            ) : results.length === 0 ? (
              <p>No jobs found.</p>
            ) : (
              <>
                <ul className="space-y-4">
                  {results.map((job) => (
                    <li key={job.job_id}>
                      <JobCard job={job} />
                    </li>
                  ))}
                </ul>
                {hasMore && (
                  <div className="flex justify-center mt-8">
                    <button
                      onClick={loadMore}
                      className="px-6 py-3 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
                      disabled={loading}
                    >
                      {loading ? 'Loading...' : 'Load More Jobs'}
                    </button>
                  </div>
                )}
              </>
            )}
          </div>
        )}

        {previousSearches.length > 0 && (
          <div className="max-w-7xl mx-auto mt-6">
            <Previous searches={previousSearches} onSelectSearch={handleSearch} />
          </div>
        )}
      </div>
      <FooterSection />
    </>
  );
}

export default transition(MainHome2);
