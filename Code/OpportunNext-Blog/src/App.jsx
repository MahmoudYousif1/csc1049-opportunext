import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './components/Home';
import OctoberWeek1 from './pages/OctoberWeek1';
import OctoberWeek2 from './pages/OctoberWeek2';
import OctoberWeek3 from './pages/OctoberWeek3';
import OctoberWeek4 from './pages/OctoberWeek4';
import NovemberWeek1 from './pages/NovemberWeek1';
import NovemberWeek2 from './pages/NovemberWeek2';
import NovemberWeek3 from './pages/NovemberWeek3';
import NovemberWeek4 from './pages/NovemberWeek4';
import DecemberWeek4 from './pages/DecemberWeek4';
import JanuaryWeek1 from './pages/JanuaryWeek1';
import JanuaryWeek2 from './pages/JanuaryWeek2';
import JanuaryWeek3 from './pages/JanuaryWeek3';
import JanuaryWeek4 from './pages/JanuaryWeek4';
import FebruaryWeek1 from './pages/FebruaryWeek1';
import FebruaryWeek2 from './pages/FebruaryWeek2';
import FebruaryWeek3 from './pages/FebruaryWeek3';
import FebruaryWeek4 from './pages/FebruaryWeek4';
import { AnimatePresence } from 'framer-motion';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Home />} />
        <Route path="/october/week-1" element={<OctoberWeek1 />} />
        <Route path="/october/week-2" element={<OctoberWeek2 />} />
        <Route path="/october/week-3" element={<OctoberWeek3 />} />
        <Route path="/october/week-4" element={<OctoberWeek4 />} />
        <Route path="/november/week-1" element={<NovemberWeek1 />} />
        <Route path="/november/week-2" element={<NovemberWeek2 />} />
        <Route path="/november/week-3" element={<NovemberWeek3 />} />
        <Route path="/november/week-4" element={<NovemberWeek4 />} />
        <Route path="/december/week-4" element={<DecemberWeek4 />} />
        <Route path="/january/week-1" element={<JanuaryWeek1 />} />
        <Route path="/january/week-2" element={<JanuaryWeek2 />} />
        <Route path="/january/week-3" element={<JanuaryWeek3 />} />
        <Route path="/january/week-4" element={<JanuaryWeek4 />} />
        <Route path="/february/week-1" element={<FebruaryWeek1 />} />
        <Route path="/february/week-2" element={<FebruaryWeek2 />} />
        <Route path="/february/week-3" element={<FebruaryWeek3 />} />
        <Route path="/february/week-4" element={<FebruaryWeek4 />} />
      </Routes>
    </AnimatePresence>
  );
}

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen">
        {/* Navbar */}
        <Navbar />

        {/* Main Content */}
        <div className="flex-grow flex items-center justify-center font-Dosis">
          <AnimatedRoutes />
        </div>
      </div>
    </Router>
  );
}

export default App;
