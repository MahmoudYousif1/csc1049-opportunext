import React from 'react';
import transition from '../components/transition';

const NovemberWeek3 = () => {
  return (
    <div className="relative">
      <article className="bg-white text-black font-oxanium p-8 max-w-4xl mx-auto py-20">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Week 3: Blog Updates & Report Structuring (November 15-21)
          </h1>
        </header>

        <p>
          During this week, we focused on updating our project blog to reflect our latest progress. We also worked on structuring our final project report, ensuring that key sections, such as methodology and implementation details, were clearly outlined. These updates helped maintain transparency in our development process while preparing for the final submission phase.
        </p>
      </article>
    </div>
  );
};

export default transition(NovemberWeek3);
