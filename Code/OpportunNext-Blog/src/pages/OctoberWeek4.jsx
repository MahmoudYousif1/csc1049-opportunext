import React from 'react';
import transition from '../components/transition';

const OctoberWeek4 = () => {
  return (
    <div className="relative">
      <article className="bg-white text-black font-oxanium p-8 max-w-4xl mx-auto py-20">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Week 4: Proposal Demonstration & Approval (October 22-28)
          </h1>
        </header>

        <p>
          This week, we presented <strong>OpportuNext</strong>, highlighting its personalized job-matching, efficient search, and data-driven insights. Alexander focused on data processing and machine learning, while Mahmoud developed the frontend and API integration using Django, React, and MySQL. We tackled challenges in model fine-tuning, real-time data handling, and database queries. The demonstration confirmed our project's feasibility, earning approval to proceed. Next, we’ll refine backend algorithms, enhance frontend features, and begin integration testing.
        </p>
      </article>
    </div>
  );
};

export default transition(OctoberWeek4);
