import React from 'react';
import transition from '../components/transition';

const OctoberWeek1 = () => {
  return (
    <div className="relative">

      <article className="bg-white text-black font-oxanium p-8 max-w-4xl mx-auto py-20">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Week 1: Brainstorming Project Ideas & Concepts (October 1-7)
          </h1>
        </header>

        <p>
          Our first week focused on brainstorming innovative project ideas that solve real-world problems. We explored concepts like an AI-based X-ray detection model, a smart job-matching platform, a recipe generator using image recognition, an event recommendation app, a budgeting tool, and a sign language text-to-speech translator. After discussing feasibility, impact, and technical requirements, we refined our ideas to move forward with structured planning.
        </p>
      </article>
    </div>
  );
};

export default transition(OctoberWeek1);
