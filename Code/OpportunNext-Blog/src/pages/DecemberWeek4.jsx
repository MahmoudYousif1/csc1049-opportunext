import React from 'react';
import transition from '../components/transition';

const DecemberWeek4 = () => {
  return (
    <div className="relative">
      <article className="bg-white text-black font-adventpro p-8 max-w-4xl mx-auto py-20">
        <header className="mb-8">
          <h1 className="text-3xl font-bold mb-4">
            Week 4: Wrapping Up the Year (December 25-31)
          </h1>
        </header>

        <p>
          The final week of December was packed with assignments, studying for exams, and wrapping up other projects. Balancing coursework with ongoing development was a challenge, but we made steady progress.  
        </p>

        <p className="mt-4">
          Despite the academic workload, we managed to install key dependencies like React Icons and Framer Motion to enhance the UI and refined styling for a more polished look. Additionally, we set up Vite with Tailwind CSS, optimizing performance for the project as we head into the new year.  
        </p>

        <p className="mt-4">
          As 2024 came to a close, our focus remained on preparing for exams so the project was pushed to the backside
        </p>
      </article>
    </div>
  );
};

export default transition(DecemberWeek4);
