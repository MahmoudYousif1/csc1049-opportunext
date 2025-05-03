import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import About from './components/About';
import Signup from './components/Signup';
import Login from './components/Login';
import MainHome from './components/MainHome'; // Uses Navbar
import SearchResults from './components/SearchResults';
import UploadCV from "./components/UploadCV";
import AccountManagement from './components/AccountManagement';
import MainHome2 from './components/MainHome2'; // Uses Navbar2

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<MainHome />} /> {/* MainHome with Navbar2 */}
        <Route path="/mainhome2" element={<MainHome2 />} /> {/* MainHome2 with Navbar */}
        <Route path="/about" element={<About />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/searchresults" element={<SearchResults />} />
        <Route path="/upload-cv" element={<UploadCV />} />
        <Route path="/account" element={<AccountManagement />} />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-white scroll-smooth">
        <AnimatedRoutes />
      </div>
    </Router>
  );
}
