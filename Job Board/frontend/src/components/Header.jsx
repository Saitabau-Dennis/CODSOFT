import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="bg-gradient-to-r from-purple-600 to-indigo-600 text-white sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-3xl font-bold">JobBoard</Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link to="/jobs" className="hover:text-yellow-300 transition duration-300">Find Jobs</Link>
          <Link to="/auth" className="hover:text-yellow-300 transition duration-300">Login / Register</Link>
          <Link 
            to="/post-job" 
            className="bg-yellow-400 hover:bg-yellow-300 text-indigo-900 font-bold py-2 px-4 rounded-full transition duration-300"
          >
            Post a Job
          </Link>
        </nav>
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>
      {isMenuOpen && (
        <div className="md:hidden bg-indigo-700 py-2">
          <Link to="/jobs" className="block px-4 py-2 hover:bg-indigo-600">Find Jobs</Link>
          <Link to="/auth" className="block px-4 py-2 hover:bg-indigo-600">Login / Register</Link>
          <Link to="/post-job" className="block px-4 py-2 hover:bg-indigo-600">Post a Job</Link>
        </div>
      )}
    </header>
  );
}

export default Header;