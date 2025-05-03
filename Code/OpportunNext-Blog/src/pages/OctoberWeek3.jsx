import React from 'react';
import transition from '../components/transition';

const OctoberWeek3 = () => {
  return (
    <div className="relative">
      <article className="bg-white text-black font-oxanium p-8 max-w-4xl mx-auto py-20">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Week 3: Project Proposal & Strategy (October 15-21)
          </h1>
        </header>

        <p>
          This week, we officially proposed <strong>OpportuNext</strong>, an AI-powered job-matching engine, and mapped out our implementation plan. Alexander focused on backend development and machine learning, while Mahmoud handled frontend and user experience. Our strategy included data preprocessing, model training, and UI development. Challenges like Django’s REST framework, React state management, and model optimization helped refine our skills. Week 3 was crucial in aligning our goals, and we now shift our focus to improving our model and UI.
        </p>
      </article>
    </div>
  );
};

export default transition(OctoberWeek3);
