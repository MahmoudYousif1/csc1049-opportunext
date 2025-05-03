import React from 'react';
import transition from '../components/transition';

const NovemberWeek4 = () => {
  return (
    <div className="relative">

      <article className="bg-white text-black font-oxanium p-8 max-w-4xl mx-auto py-20">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Week 4: Final Adjustments & Report Submission Prep (November 22-28)
          </h1>
        </header>

        <p>
          In the final week of November, we made last-minute fixes to documentation, updated images, and refined our functional specification report** before submission. The focus was on spacing, figure alignment, and final proofreads to ensure a polished final product. We also began preparing for the next development phase, which includes integration testing and performance optimization.
        </p>
      </article>
    </div>
  );
};

export default transition(NovemberWeek4);
