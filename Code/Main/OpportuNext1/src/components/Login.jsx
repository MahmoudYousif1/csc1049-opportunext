import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import transition from './Transition';
import FooterSection from './FooterSection';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const location = useLocation();
  const [successMessage, setSuccessMessage] = useState(location.state?.message);

  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://127.0.0.1:8000/login/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        localStorage.setItem("username", data.username);
        navigate('/mainhome2', {
          state: {
            message: data.message,
            username: data.username,
          },
        });
      } else {
        const errData = await response.json();
        console.log('Error logging in:', errData);
      }
    } catch (error) {
      console.error('Network error:', error);
    }
  };

  return (
    <><div className="min-h-screen bg-white">
      <Navbar />

      <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full bg-white p-8 rounded-lg shadow-lg space-y-8">
          {successMessage && (
            <div className="bg-green-100 text-green-800 p-3 rounded">
              {successMessage}
            </div>
          )}
          <div>
            <h1 className="text-center text-3xl font-extrabold text-gray-900">
              Log In to Your Account
            </h1>
            <p className="mt-2 text-center text-sm text-gray-600">
              Welcome back! Please enter your credentials.
            </p>
          </div>

          <form onSubmit={handleLogin} className="mt-8 space-y-6">
            <div className="rounded-md shadow-sm -space-y-px">
              <div>
                <label htmlFor="username" className="sr-only">
                  Username
                </label>
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)} />
              </div>
              <div>
                <label htmlFor="password" className="sr-only">
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  className="appearance-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)} />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
              >
                Log In
              </button>
            </div>
          </form>

          <div className="text-center">
            <a href="/signup" className="font-medium text-blue-600 hover:text-blue-500">
              Don't have an account? Sign up
            </a>
          </div>
        </div>
      </div>
    </div><FooterSection /></>
  );
}

export default transition(Login);
