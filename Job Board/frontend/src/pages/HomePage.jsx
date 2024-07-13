// HomePage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaRocket, FaSearch, FaUserPlus } from "react-icons/fa";
import Footer from "../components/Footer";
import { motion } from "framer-motion";

function HomePage() {
  const navigate = useNavigate();

  const handleAuthAction = (action) => {
    navigate("/auth", { state: { action } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 font-poppins text-white">
      <Header onSignIn={() => handleAuthAction("signin")} />
      <HeroSection />
      <FeaturedJobsSection />
      <CTASection 
        onCreateProfile={() => handleAuthAction("signup")}
        onContactUs={() => navigate("/contact")}
      />
      <Footer />
    </div>
  );
}

function Header({ onSignIn, isLoggedIn }) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavigation = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      onSignIn();
    }
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <header className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}>
      <nav className="container mx-auto px-6 py-4 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="text-2xl font-extrabold text-purple-500 tracking-wider"
        >
          CareerLaunch
        </motion.div>
        <div className="md:hidden">
          <button
            onClick={toggleMenu}
            className="text-gray-300 hover:text-purple-400 focus:outline-none"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16m-7 6h7"
              ></path>
            </svg>
          </button>
        </div>
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className={`absolute md:relative top-full left-0 right-0 bg-gray-900 md:bg-transparent ${menuOpen ? 'block' : 'hidden'} md:flex md:items-center md:w-auto`}
        >
          <div className="flex flex-col md:flex-row items-end md:items-center py-4 md:py-0 px-4 md:px-0">
            <Link
              to="/find-jobs"
              onClick={handleNavigation}
              className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium block mb-2 md:mb-0 md:mr-6"
            >
              Explore Careers
            </Link>
            <Link
              to="/employer-dashboard"
              onClick={handleNavigation}
              className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium block mb-2 md:mb-0 md:mr-6"
            >
              Post a Job
            </Link>
            <button
              onClick={onSignIn}
              className="bg-purple-600 text-white px-5 py-2 rounded-full hover:bg-purple-700 transition duration-300 font-semibold text-base transform hover:scale-105"
            >
              Join Now
            </button>
          </div>
        </motion.div>
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="bg-gradient-to-r from-gray-900 via-purple-900 to-gray-900 text-white py-32 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <h1 className="text-6xl font-extrabold mb-4 leading-tight">
            Launch Your <span className="text-purple-400 animate-pulse">Dream Career</span>
          </h1>
          <p className="text-xl mb-8 text-gray-300 max-w-2xl mx-auto leading-relaxed">
            Discover opportunities that ignite your passion and propel your career forward.
          </p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Link
              to="/auth"
              className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300 inline-flex items-center text-lg transform hover:scale-105"
            >
              <FaSearch className="mr-2" /> Find Your Next Role
            </Link>
          </motion.div>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 to-gray-900 opacity-20"></div>
    </section>
  );
}

function FeaturedJobsSection() {
  const featuredJobs = [
    {
      title: "AI Research Scientist",
      company: "TechNova",
      location: "San Francisco, CA",
      type: "Full-time",
    },
    {
      title: "Digital Marketing Strategist",
      company: "GrowthPulse",
      location: "New York, NY",
      type: "Full-time",
    },
    {
      title: "Senior UX/UI Designer",
      company: "DesignSphere",
      location: "Remote",
      type: "Contract",
    },
    {
      title: "Data Science Team Lead",
      company: "DataNexus",
      location: "Austin, TX",
      type: "Full-time",
    },
  ];

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-bold text-center mb-12"
        >
          Featured Opportunities
        </motion.h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out border-l-4 border-purple-500 transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-purple-400 mb-3 font-medium text-lg">{job.company}</p>
              <div className="flex items-center text-gray-400 mb-2 text-base">
                <FaMapMarkerAlt className="mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-400 text-base">
                <FaBriefcase className="mr-2" />
                <span>{job.type}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-12"
        >
          <Link
            to="/auth"
            className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300 inline-block text-base transform hover:scale-105"
          >
            Explore All Opportunities →
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function CTASection({ onCreateProfile, onContactUs }) {
  return (
    <section className="bg-gradient-to-r from-purple-800 via-purple-700 to-purple-800 py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl font-extrabold mb-4 text-white"
        >
          Ready to Skyrocket Your Career?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-xl mb-8 text-purple-200 max-w-2xl mx-auto"
        >
          Join thousands of professionals discovering their dream roles.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
        >
          <button
            onClick={onCreateProfile}
            className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold text-base hover:bg-gray-100 transition duration-300 transform hover:scale-105 flex items-center"
          >
            <FaUserPlus className="mr-2" /> Create Your Profile
          </button>
          <button
            onClick={onContactUs}
            className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold text-base hover:bg-purple-800 transition duration-300 transform hover:scale-105"
          >
            Get in Touch
          </button>
        </motion.div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-purple-600 opacity-30"></div>
    </section>
  );
}

export default HomePage;
