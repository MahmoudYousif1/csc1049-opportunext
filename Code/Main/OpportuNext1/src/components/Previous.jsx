import React from 'react';

const Previous = ({ searches, onSelectSearch }) => {
  // Get the most recent 4 searches (latest first)
  const recentSearches = searches.slice(-4).reverse();

  return (
    <div className="mt-10 px-4">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-2xl font-bold text-gray-800 mb-6 border-b pb-2">
          Previous Searches
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {recentSearches.map((query, index) => (
            <div
              key={index}
              onClick={() => onSelectSearch(query)}
              className="cursor-pointer bg-gray-50 hover:bg-gray-100 transition border border-gray-200 rounded-lg p-4 shadow-sm"
            >
              <p className="text-lg text-gray-700 text-center">{query}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Previous;
