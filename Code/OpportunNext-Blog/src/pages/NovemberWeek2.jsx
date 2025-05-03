import React from 'react';
import transition from '../components/transition';

const NovemberWeek2 = () => {
  return (
    <div className="relative">

      <article className="bg-white text-black font-oxanium p-8 max-w-4xl mx-auto py-20">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Week 2: Minor Fixes & Formatting Adjustments (November 8-14)
          </h1>
        </header>

        <p>
          This week was dedicated to making minor fixes and formatting adjustments across our documentation. We addressed spacing issues, font inconsistencies, and figure placements to enhance the document’s readability. Additionally, we ensured that all images and diagrams were correctly labeled and referenced. While no major development took place, these refinements contributed to the overall polish of our project materials.
        </p>
      </article>
    </div>
  );
};

export default transition(NovemberWeek2);
