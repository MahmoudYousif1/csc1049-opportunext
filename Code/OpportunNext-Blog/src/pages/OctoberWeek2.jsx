import React from 'react';
import transition from '../components/transition';

const OctoberWeek2 = () => {
  return (
    <div className="relative">
      <article className="bg-white text-black font-oxanium p-8 max-w-4xl mx-auto py-20">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Week 2: Project Selection & Dataset Discovery (October 8-14)
          </h1>
        </header>

        <p>
          This week, we presented six project ideas to our supervisor, Michael Scriney, who provided valuable feedback on feasibility, impact, and team strengths. After careful evaluation, we selected the **Smart Job Matcher** due to its strong potential for real-world application, availability of job data, and alignment with our AI/ML expertise. We then discovered a comprehensive job postings dataset with diverse features—essential for building an effective matching algorithm. With a clear focus and dataset in hand, we are now ready to move forward with development.
        </p>
      </article>
    </div>
  );
};

export default transition(OctoberWeek2);
