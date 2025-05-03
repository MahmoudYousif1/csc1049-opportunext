import React from 'react';
import transition from '../components/transition';

const NovemberWeek1 = () => {
  return (
    <div className="relative">

      <article className="bg-white text-black font-oxanium p-8 max-w-4xl mx-auto py-20">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Week 1: Refining Documentation & Proposal Updates (November 1-7)
          </h1>
        </header>

        <p>
          This week, we focused on refining our documentation and updating the project proposal. We reviewed our functional specifications, ensuring clarity and completeness. Small but crucial edits were made to sections like 2.2, 4.2, and 4.4, improving readability and accuracy. Additionally, we began structuring our next development phase based on feedback received. These refinements ensured our project remained well-documented and aligned with its objectives.
        </p>
      </article>
    </div>
  );
};

export default transition(NovemberWeek1);
