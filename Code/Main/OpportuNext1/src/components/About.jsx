import React from 'react';

function About() {
  return (
    <div id="about" className="flex flex-col min-h-screen bg-white text-black scroll-smooth">
      <div className="container max-w-8xl mx-auto px-4 py-20 flex flex-col items-left text-left">
        <h1 className="text-6xl font-medium mb-8">
          OpportuNext is a web tool that aids job seekers in locating employment possibilities by evaluating their CVs and suggesting job ads that correspond with their skills, experience, and career objectives.
        </h1>
        <p className="text-2xl font-normal">
          By Alexander Yakushenko & Mahmoud Yousif
        </p>
      </div>
    </div>
  );
}

export default About;
