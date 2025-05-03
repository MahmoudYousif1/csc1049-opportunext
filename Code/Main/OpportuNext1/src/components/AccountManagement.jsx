import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
  FaUserCircle,
  FaEnvelope,
  FaLock,
  FaSave,
  FaChevronUp,
  FaChevronDown,
} from 'react-icons/fa';
import Navbar2 from './Navbar2';
import transition from './Transition';

function AccountManagement() {
  const navigate = useNavigate();
  const storedUsername = localStorage.getItem('username');

  // If no user is logged in, redirect to login.
  useEffect(() => {
    if (!storedUsername) {
      navigate('/login');
    }
  }, [storedUsername, navigate]);

  // User details
  const [userDetails, setUserDetails] = useState({
    username: '',
    email: '',
    is_staff: false,
  });

  // States for new password fields.
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [updateMessage, setUpdateMessage] = useState('');

  // States for dropdown toggles.
  const [showOverview, setShowOverview] = useState(true);
  const [showUpdate, setShowUpdate] = useState(true);

  // ✅ Fetch user details from the backend
  useEffect(() => {
    async function fetchUserDetails() {
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/api/account_details/?username=${storedUsername}`,
          {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setUserDetails({
            username: data.username,
            email: data.email,
            is_staff: data.is_staff,
          });
        } else {
          console.error('Failed to fetch user details');
        }
      } catch (error) {
        console.error('Error fetching user details:', error);
      }
    }
    if (storedUsername) {
      fetchUserDetails();
    }
  }, [storedUsername]);

  // ✅ Handle form submission for updating account details
  const handleUpdate = async (e) => {
    e.preventDefault();
    if (newPassword && newPassword !== confirmPassword) {
      setUpdateMessage('Passwords do not match.');
      return;
    }

    const payload = {
      username: storedUsername, // ✅ Ensure username is sent
      email: userDetails.email,
      ...(newPassword && { password: newPassword }),
    };

    try {
      const response = await fetch('http://127.0.0.1:8000/api/account/update/', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      if (response.ok) {
        setUpdateMessage('Account updated successfully.');
      } else {
        const errData = await response.json();
        setUpdateMessage('Error updating account: ' + JSON.stringify(errData));
      }
    } catch (error) {
      console.error('Update error:', error);
      setUpdateMessage('Error updating account.');
    }
  };

  return (
    <div className="min-h-screen bg-white font-sans">
      <Navbar2 />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto mt-10 p-8 bg-white shadow-xl rounded-lg"
      >
        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7 }}
          className="flex items-center justify-center text-3xl font-bold text-gray-800 mb-6"
        >
          <FaUserCircle className="mr-3 text-blue-500" />
          Account Management
        </motion.h1>

        {/* Account Overview Dropdown */}
        <div className="mb-8 border-b border-gray-200 pb-4">
          <button
            onClick={() => setShowOverview((prev) => !prev)}
            className="flex items-center justify-between w-full text-xl font-semibold text-gray-700 mb-2 focus:outline-none"
          >
            <div className="flex items-center">
              <FaUserCircle className="mr-2 text-blue-400" />
              Account Overview
            </div>
            {showOverview ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {showOverview && (
            <div>
              <p className="mb-1">
                <span className="font-medium text-gray-600">Username:</span> {userDetails.username}
              </p>
              <p className="mb-1">
                <span className="font-medium text-gray-600">Email:</span> {userDetails.email}
              </p>
              <p>
                <span className="font-medium text-gray-600">Staff Status:</span>{' '}
                {userDetails.is_staff ? 'Yes' : 'No'}
              </p>
            </div>
          )}
        </div>

        {/* Update Account Information Dropdown */}
        <div>
          <button
            onClick={() => setShowUpdate((prev) => !prev)}
            className="flex items-center justify-between w-full text-xl font-semibold text-gray-700 mb-4 focus:outline-none"
          >
            <div className="flex items-center">
              <FaLock className="mr-2 text-blue-400" />
              Update Account Information
            </div>
            {showUpdate ? <FaChevronUp /> : <FaChevronDown />}
          </button>
          {showUpdate && (
            <form onSubmit={handleUpdate} className="space-y-5">
              {/* Email */}
              <div>
                <label className="block mb-1 font-medium text-gray-600 flex items-center">
                  <FaEnvelope className="mr-2 text-gray-500" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={userDetails.email}
                  onChange={(e) => setUserDetails({ ...userDetails, email: e.target.value })}
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>

              {/* New Password */}
              <div>
                <label className="block mb-1 font-medium text-gray-600 flex items-center">
                  <FaLock className="mr-2 text-gray-500" />
                  New Password
                </label>
                <input
                  type="password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  placeholder="Leave blank to keep unchanged"
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>

              {/* Confirm Password */}
              <div>
                <label className="block mb-1 font-medium text-gray-600 flex items-center">
                  <FaLock className="mr-2 text-gray-500" />
                  Confirm Password
                </label>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="Confirm new password"
                  className="w-full border border-gray-300 p-3 rounded focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
                />
              </div>

              {/* Update Message */}
              {updateMessage && (
                <p className={`text-sm font-medium ${updateMessage.includes('Error') ? 'text-red-600' : 'text-green-600'}`}>
                  {updateMessage}
                </p>
              )}

              {/* Submit Button */}
              <button type="submit" className="flex items-center justify-center w-full bg-blue-500 text-white py-3 rounded hover:bg-blue-600 transition-colors font-medium">
                <FaSave className="mr-2" />
                Update Account
              </button>
            </form>
          )}
        </div>
      </motion.div>
    </div>
  );
}

export default transition(AccountManagement);
