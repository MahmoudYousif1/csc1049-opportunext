import React from 'react';
import { Link } from 'react-router-dom';
import '/src/index.css';

function Navbar() {
    return (
        <nav className="fixed top-0 left-0 w-full z-50 bg-white py-4 ">
            <div className="max-w-7xl mx-auto px-4 flex items-center justify-between">
                {/* Left - Navigation Links */}
                <div className="flex space-x-6 flex-1">
                    <Link
                        to="/"
                        className="text-black hover:text-blue-600 transition duration-300"
                        style={{ fontFamily: 'Oxanium' }}
                    >
                        Home
                    </Link>
                    <a
                        href="https://gitlab.computing.dcu.ie/yakusha2/2025-csc1049-ayakushenko-projectmanager" // Replace with your GitLab URL if needed
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-black hover:text-blue-600 transition duration-300"
                        style={{ fontFamily: 'Oxanium' }}
                    >
                        GitLab Project
                    </a>
                </div>

                {/* Center - Title */}
                <div className="text-center flex-none">
                    <h1
                        className="text-2xl font-bold text-black"
                        style={{ fontFamily: 'Dosis' }}
                    >
                        OPPORTUNEXT DEVELOPMENT BLOG
                    </h1>
                </div>

                {/* Right - Names */}
                <div className="text-sm text-gray-600 flex-1 text-right" style={{ fontFamily: 'Oxanium' }}>
                    Mahmoud Yousif & Alexander Yakushenko
                </div>
            </div>
        </nav>
    );
}

export default Navbar;
