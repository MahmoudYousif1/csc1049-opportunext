import React, { useState, useEffect } from "react";
import { FaBars, FaTimes, FaUserPlus, } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const location = useLocation();

  // Check for screen width to toggle mobile menu
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);
    return () => window.removeEventListener("resize", checkScreenSize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);

  // Function to check if the link is active
  const isActive = (path) => location.pathname === path;

  // Desktop Links
  const desktopLinks = [
    { path: "/", label: "Home" },
    { path: "#about", label: "About" },
    { path: "/signup", label: "Upload CV" },
  ];

  // Mobile Links
  const mobileLinks = [
    { path: "/mainhome", label: "Home" },
    { path: "/about", label: "About" },
    { path: "/upload-cv", label: "Upload CV"},
    { path: "/signup", label: "Sign-up" },
    { path: "/login", label: "Login"},
  ];

  return (
    <>
      {/* Main Navbar */}
      <nav className="sticky top-0 z-50 flex justify-between items-center px-6 py-4 bg-white text-Black">
        {/* Logo */}
        <div className="text-1xl font-bold">
          <h1 className="">OpportuNext</h1>
        </div>

        {/* Desktop Navigation */}
        {!isMobile && (
          <div className="flex space-x-6 items-center text-sm font-bold">
            {desktopLinks.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className={`relative transition duration-300 transform hover:scale-105 flex items-center gap-2 ${isActive(item.path) ? "text-blue-300" : "hover:text-blue-200"
                  }`}
              >
                {item.icon}
                <span>{item.label}</span>
                {isActive(item.path) && (
                  <motion.div
                    layoutId="underline"
                    className="absolute left-0 w-full h-0.5 bg-white mt-1"
                  ></motion.div>
                )}
              </a>
            ))}

            {/* Sign-up Button with icon */}
            <a
              href="/signup"
              className="flex items-center gap-2 bg-white text-blue-600 px-4 py-2 rounded-lg shadow-md hover:bg-blue-300 hover:text-white transform hover:scale-105 transition duration-300"
            >
              <FaUserPlus />
              <span>Sign-up</span>
            </a>
          </div>
        )}

        {/* Mobile Menu Button */}
        {isMobile && (
          <button onClick={toggleMenu} className="focus:outline-none">
            {isMenuOpen ? <FaTimes size={22} /> : <FaBars size={22} />}
          </button>
        )}
      </nav>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isMenuOpen && isMobile && (
          <motion.div
            className="fixed inset-0 bg-blue-700 text-white z-50 flex flex-col justify-center items-center space-y-6 text-lg font-medium"
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
          >
            {mobileLinks.map((item, index) => (
              <a
                key={index}
                href={item.path}
                className="flex items-center gap-2 hover:text-blue-300 transition duration-300"
                onClick={toggleMenu}
              >
                {item.icon}
                <span>{item.label}</span>
              </a>
            ))}

            {/* Close Button */}
            <button onClick={toggleMenu} className="absolute top-6 right-6 text-white hover:text-blue-300">
              <FaTimes size={26} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
