import React, { useState, useEffect } from 'react';
import { FaBars, FaTimes, FaHome, FaUpload } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation, useNavigate } from 'react-router-dom';
import UserDropdown from './UserDropdown';

export default function Navbar2() {
  const location = useLocation();
  const navigate = useNavigate();

  const [username, setUsername] = useState(
    location.state?.username || localStorage.getItem('username')
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (!username) {
      navigate('/login');
    }
  }, [username, navigate]);

  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener('resize', checkScreenSize);
    return () => window.removeEventListener('resize', checkScreenSize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  const desktopLinks = [
    { path: '/mainhome2', label: 'Home' },
    { path: '/upload-cv', label: 'Upload CV' }
  ];

  const mobileLinks = [
    { path: '/mainhome2', label: 'Home', icon: <FaHome /> },
    { path: '/upload-cv', label: 'Upload CV', icon: <FaUpload /> },
  ];

  return (
    <>
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-5 bg-white text-black">
        <div className="flex items-center space-x-4">
          {/* Use the dropdown here */}
          <UserDropdown username={username} />
        </div>

        {!isMobile && (
          <div className="flex items-center space-x-6 text-sm font-bold">
            {desktopLinks.map((link, index) => (
              <a
                key={index}
                href={link.path}
                className="transition transform hover:scale-105 hover:text-blue-300"
              >
                {link.label}
              </a>
            ))}
          </div>
        )}

        {isMobile && (
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        )}
      </nav>

      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-blue-700 text-white z-50 flex flex-col justify-center items-center space-y-6 text-lg font-medium"
            initial={{ y: '-100%' }}
            animate={{ y: 0 }}
            exit={{ y: '-100%' }}
            transition={{ duration: 0.5, ease: 'easeInOut' }}
          >
            {mobileLinks.map((item, index) => (
              <a
                key={index}
                href={item.path}
                onClick={toggleMenu}
                className="flex items-center gap-2 hover:text-blue-300 transition duration-300"
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}
            <button
              onClick={toggleMenu}
              className="absolute top-6 right-6 text-white hover:text-blue-300"
            >
              <FaTimes size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
