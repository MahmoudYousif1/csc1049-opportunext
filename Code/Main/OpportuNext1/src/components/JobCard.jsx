import React, { useState } from 'react';
import { FaChevronDown, FaChevronUp, FaClock } from 'react-icons/fa';

// Function to format numbers with thousands separators.
const formatSalary = (salary) => {
  return salary ? new Intl.NumberFormat('en-US').format(salary) : 'N/A';
};

const JobCard = ({ job }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  // Toggles the card's expanded state.
  const toggleExpand = () => {
    setIsExpanded(!isExpanded);
    if (isExpanded) setShowFullDescription(false);
  };

  // Returns the first 3 sentences of the description by splitting by the dot
  const getShortDescription = (desc) => {
    if (!desc) return 'No description available.';
    const sentences = desc.split('. ').filter(sentence => sentence.trim().length > 0);
    if (sentences.length <= 3) return desc;
    return sentences.slice(0, 3).join('. ') + '.';
  };

  const shortDescription = getShortDescription(job.description);

  // Checking if a job is hourly.
  const isHourly = job.pay_period && job.pay_period.toUpperCase() === "HOURLY";

  // Formatting salary display.
  const salaryDisplay = isHourly
    ? (job.max_salary ? `$${formatSalary(job.max_salary)} per hour` : 'N/A')
    : (job.max_salary ? `$${formatSalary(job.max_salary)}` : 'N/A');

  return (
    <div
      onClick={toggleExpand}
      className="cursor-pointer border rounded shadow p-4 hover:shadow-xl transition-all duration-300 bg-white"
    >
      <div className="flex justify-between items-center">
        <div>
          <h3 className="text-xl font-bold">{job.title}</h3>
          <p className="text-gray-600">
            {job.company_title || 'Unknown'}
            {job.location ? ` • ${job.location}` : ''}
          </p>
          <p className="mt-1 font-semibold">
            {isHourly ? "Hourly Wage: " : "Salary: "}{salaryDisplay}
          </p>
          <p className="mt-1 flex items-center text-gray-700">
            <span className="font-semibold mr-1">Pay Period:</span>
            <FaClock className="mr-1 text-gray-500" />
            {job.pay_period || 'N/A'}
          </p>
          <p className="mt-1 text-gray-700">
            <span className="font-semibold">Work Type:</span> {job.work_type || 'N/A'}
          </p>
        </div>
        <div className="text-gray-500 text-xl">
          {isExpanded ? <FaChevronUp /> : <FaChevronDown />}
        </div>
      </div>

      {/* Expanded details */}
      {isExpanded && (
        <div className="mt-4 border-t pt-4 transition-all duration-300 ease-in-out">
          <div className="flex flex-col">
            {/* Job Details */}
            <div className="mb-2">
              <p className="text-gray-700">
                <span className="font-semibold">Pay Period:</span> {job.pay_period || 'N/A'}
              </p>
              {isHourly ? (
                <p className="mt-2 text-gray-700">
                  <span className="font-semibold">Hourly Wage:</span> {salaryDisplay}
                </p>
              ) : (
                <p className="mt-2 text-gray-700">
                </p>
              )}
              <p className="mt-2 text-gray-700">
                <span className="font-semibold">Skills:</span> {job.formatted_skills_desc || 'N/A'}
              </p>
            </div>

            {/* Description */}
            <div className="mt-4 p-4 bg-gray-50 rounded border border-gray-200">
              <h4 className="font-semibold text-lg text-gray-800 mb-2">Description</h4>
              <p className="text-gray-600 leading-relaxed text-base">
                {showFullDescription ? (job.description || 'No description available.') : shortDescription}
              </p>
              {job.description && job.description !== shortDescription && (
                <button
                  onClick={(e) => {
                    e.stopPropagation(); // Prevents the card from toggling when clicking the link.
                    setShowFullDescription(!showFullDescription);
                  }}
                  className="text-blue-600 underline mt-2"
                >
                  {showFullDescription ? 'View Less' : 'View More'}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobCard;
