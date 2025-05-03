import React, { useState, useRef, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

function SearchBar({ onSearch, externalQuery = '' }) {
  const [query, setQuery] = useState(externalQuery);
  const [suggestions, setSuggestions] = useState([]);
  const containerRef = useRef(null);

  // Sync internal state with external query prop changes.
  useEffect(() => {
    setQuery(externalQuery);
  }, [externalQuery]);

  async function handleChange(e) {
    const value = e.target.value;
    setQuery(value);

    if (value.length > 2) {
      try {
        const response = await fetch(`http://127.0.0.1:8000/search_jobs/?q=${value}`);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        if (data.results && Array.isArray(data.results)) {
          setSuggestions(data.results.slice(0, 5));
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error('Error fetching suggestions:', err);
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (onSearch) {
      onSearch(query);
    }
    setSuggestions([]);
  }

  function clearQuery() {
    setQuery('');
    setSuggestions([]);
  }

  function handleItemClick(job) {
    setQuery(job.title);
    setSuggestions([]);
    if (onSearch) {
      onSearch(job.title);
    }
  }

  useEffect(() => {
    function handleClickOutside(e) {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setSuggestions([]);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className="w-full max-w-4xl mx-auto mt-8 px-4 relative">
      <form
        onSubmit={handleSubmit}
        className="relative flex items-center bg-white shadow-lg rounded-full overflow-hidden transition-all duration-300 transform focus-within:scale-105 focus-within:ring-2 focus-within:ring-blue-300"
      >
        <span className="pl-4 text-gray-400 text-xl">
          <FaSearch />
        </span>
        <input
          type="text"
          placeholder="Search for jobs..."
          value={query}
          onChange={handleChange}
          className="flex-1 px-4 py-4 text-lg focus:outline-none"
        />
        {query && (
          <button
            type="button"
            onClick={clearQuery}
            className="pr-4 text-gray-400 hover:text-gray-600 transition-colors text-xl"
            aria-label="Clear search"
          >
            <FaTimes />
          </button>
        )}
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-4 text-lg transition-colors"
        >
          Search
        </button>
      </form>
      {suggestions.length > 0 && (
        <ul className="absolute z-10 w-full bg-white border border-gray-300 rounded-lg shadow mt-2 transition-opacity duration-75">
          {suggestions.map((job) => (
            <li
              key={job.job_id}
              className="p-4 hover:bg-gray-50 transition cursor-pointer"
              onClick={() => handleItemClick(job)}
            >
              <div className="font-semibold text-gray-800">{job.title}</div>
              <div className="text-sm text-gray-500">
                {job.company_title || 'Unknown'}
                {job.location ? ` • ${job.location}` : ''}
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default SearchBar;
