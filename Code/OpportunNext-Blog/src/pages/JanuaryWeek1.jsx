import React from 'react';
import transition from '../components/transition';

const JanuaryWeek1 = () => {
  return (
    <div className="relative">

      <article className="bg-white text-black font-adventpro p-8 max-w-4xl mx-auto py-20">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">
            Week 1: Setting Up the New Year (January 1-7)
          </h1>
        </header>

        <p>
        The beginning of 2025 presented some hurdles, particularly with our old project folder, which had become cluttered and difficult to manage. Over time, redundant files, outdated code, and inconsistent structures made it challenging to implement new features efficiently. This disorganization slowed down development and created confusion when navigating the project.

To address these issues, we decided to restructure the project from the ground up. This involved reorganizing files, removing obsolete code, and establishing a more structured and scalable framework. As part of this process, we also took the opportunity to redesign key sections of the website, including a fresh home page, an improved navigation system, and a well-structured About section.
        </p>
      </article>
    </div>
  );
};

export default transition(JanuaryWeek1);
