import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import transition from './Transition';
import FooterSection from './FooterSection';
import About from './About';
import img1 from '../assets/Images/img1.jpg';
import img2 from '../assets/Images/img2.jpg';
import img3 from '../assets/Images/img3.jpg';
import img4 from '../assets/Images/img4.jpg';
import img5 from '../assets/Images/img5.jpg';
import img6 from '../assets/Images/img6.jpg';
import img7 from '../assets/Images/img7.jpg';
import img8 from '../assets/Images/img8.jpg';
import img9 from '../assets/Images/img9.jpg';
import img10 from '../assets/Images/img10.jpg';
import img11 from '../assets/Images/img11.jpg';
import '/src/index.css';

function MainHome() {
  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.message);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const images = [img1, img2, img3, img4, img5, img6, img7, img8, img9, img10, img11];

  return (
    <>
      <div className="flex flex-col min-h-screen bg-white text-black scroll-smooth">
        <Navbar />

        {successMessage && (
          <div className="bg-green-100 text-green-800 p-4 mb-4 mx-auto max-w-md rounded absolute">
            {successMessage}
          </div>
        )}

        {/* Heading Section */}
        <div className="p-15 text-center">
          <h1 className="text-8xl font-normal text-gray-800 mb-3">
            LET YOUR PASSION BE THE COMPASS TO YOUR IDEAL JOB
          </h1>
          <p className="text-lg font-bold text-gray-600 mb-6">
            Discover over 60,000 job opportunities
          </p>
        </div>

        {/* Sliding Images Section */}
        <div className="max-w-6xl mx-auto p-8 overflow-hidden">
          <div className="flex animate-slide">
            {images.map((img, idx) => (
              <img
                key={`img1-${idx}`}
                src={img}
                alt={`Slide ${idx + 1}`}
                className="w-64 h-48 object-cover rounded-lg shadow-md mr-4"
              />
            ))}
            {images.map((img, idx) => (
              <img
                key={`img2-${idx}`}
                src={img}
                alt={`Slide duplicate ${idx + 1}`}
                className="w-64 h-48 object-cover rounded-lg shadow-md mr-4"
              />
            ))}
          </div>
        </div>

        {/* About Section */}
        <div className="max-w-6xl mx-auto p-8">
          <About />
        </div>
      </div>

      <FooterSection />
    </>
  );
}

export default transition(MainHome);
