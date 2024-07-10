// components/Header.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';

const Header = ({ title }) => {
  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-2xl font-extrabold text-purple-500 tracking-wider flex items-center">
          <FaHome className="mr-2" />
          
        </Link>
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="w-32"></div>
      </nav>
    </header>
  );
};

export default Header;