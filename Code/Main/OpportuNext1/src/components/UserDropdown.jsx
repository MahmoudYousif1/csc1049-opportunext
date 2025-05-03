import React, { useState, useRef, useEffect } from 'react';
import { FaUser, FaUserCog, FaSignOutAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const UserDropdown = ({ username }) => {
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const dropdownRef = useRef(null);
    const navigate = useNavigate();

    // Toggle the dropdown when the user icon is clicked
    const handleToggle = () => {
        setDropdownOpen(prev => !prev);
    };

    // Close the dropdown if clicking outside of it
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    // logout action
    const handleLogout = () => {
        localStorage.removeItem('username');
        navigate('/');
    };


    const handleManageAccount = () => {
        navigate('/account');
    };

    return (
        <div className="relative inline-block" ref={dropdownRef}>
            {/* User Button */}
            <button
                onClick={handleToggle}
                className="flex items-center space-x-2 p-2 rounded-md focus:outline-none hover:bg-gray-100 transition"
            >
                <FaUser size={20} />
                <span className="text-sm font-medium">{username || 'User'}</span>
            </button>

            <AnimatePresence>
                {dropdownOpen && (
                    <motion.div
                        // Animating a small in/out effect
                        initial={{ opacity: 0, scale: 0.95, y: -5 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: -5 }}
                        transition={{ duration: 0.15 }}
                        className="origin-top-left absolute left-0 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-20"
                    >
                        <div className="absolute -top-2 left-4 w-0 h-0 border-l-8 border-r-8 border-b-8 border-transparent 
                              border-b-white" />


                        <button
                            onClick={handleManageAccount}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 
                         hover:bg-gray-100 hover:text-gray-900 transition"
                        >
                            <FaUserCog className="mr-2" />
                            Manage Account
                        </button>
                        <button
                            onClick={handleLogout}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 
                         hover:bg-gray-100 hover:text-gray-900 transition"
                        >
                            <FaSignOutAlt className="mr-2" />
                            Logout
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UserDropdown;
