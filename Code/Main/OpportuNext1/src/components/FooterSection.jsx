import React from 'react';

export default function FooterSection() {
  return (
    <footer className="bg-white text-black py-10 px-12 border-t">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row justify-between items-start">
        
        {/* Left Section - Site Title */}
        <div>
          <h1 className="text-2xl font-semibold">OpportuNext</h1>
          <p className="text-gray-600 mt-2">
            Crafting better solutions one step at a time
          </p>
        </div>

        {/* Middle Section - Location */}
        <div>
          <h2 className="text-lg font-semibold">Location</h2>
          <p className="text-gray-600">
            Lansdowne Rd, <br />
            Dublin 4
          </p>
        </div>

        {/* Right Section - Contact */}
        <div>
          <h2 className="text-lg font-semibold">Contact</h2>
          <p>
            <a href="mailto:email@example.com" className="text-blue-600 underline">
              Opportunext@example.com
            </a>
          </p>
          <p className="text-gray-600">(000) 000-0000</p>
        </div>
      </div>
    </footer>
  );
}
