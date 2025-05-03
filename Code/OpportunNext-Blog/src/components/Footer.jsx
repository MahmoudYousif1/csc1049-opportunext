import React from 'react';
import { FaGithub, FaGitlab,} from 'react-icons/fa';

function Footer() {
    return (
        <footer className="bg-gray-800 text-gray-300 py-2 flex flex-col items-center justify-center w-full">
            {/* Social Media Icons */}
            <div className="flex space-x-6 mb-4">
                <a
                    href="/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl hover:text-white transition-colors duration-300"
                    aria-label="GitHub"
                >
                    <FaGithub />
                </a>
                <a
                    href="https://gitlab.computing.dcu.ie/yakusha2/2025-csc1049-ayakushenko-projectmanager"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-3xl hover:text-white transition-colors duration-300"
                    aria-label="GitLab"
                >
                    <FaGitlab />
                </a>
            </div>

            {/* Footer Text */}
            <p className="text-sm text-gray-500">&copy; {new Date().getFullYear()} OpportuNext Development Blog. By Alexander Yakushenko & Mahmud Yousif.</p>
        </footer>
    );
}

export default Footer;
