// HomePage.js
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from "react-router-dom";
import { FaSearch, FaBriefcase, FaUserPlus, FaChevronDown } from "react-icons/fa";
import Footer from "../components/Footer";
import { motion, AnimatePresence } from "framer-motion";

function HomePage() {
  const navigate = useNavigate();

  const handleAuthAction = (action) => {
    navigate("/auth", { state: { action } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black font-poppins text-white">
      <Header onSignIn={() => handleAuthAction("signin")} />
      <HeroSection />
      <FeaturedJobsSection />
      <StatisticsSection />
      <TestimonialsSection />
      <CTASection 
        onCreateProfile={() => handleAuthAction("signup")}
        onContactUs={() => navigate("/contact")}
      />
      <Footer />
    </div>
  );
}
function Header({ onSignIn }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <motion.header 
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ type: "spring", stiffness: 100 }}
      className={`fixed w-full z-50 transition-all duration-300 ${scrolled ? 'bg-gray-900 shadow-lg' : 'bg-transparent'}`}
    >
      <nav className="container mx-auto px-4 py-3 flex items-center justify-between">
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold text-purple-500"
        >
          CareerLaunch
        </motion.div>
        
        {/* Hamburger menu for mobile */}
        <div className="md:hidden">
          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="text-white">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>

        {/* Desktop menu */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="hidden md:flex items-center space-x-6"
        >
          <Link to="/auth" className="text-sm hover:text-purple-400 transition duration-300">Explore Careers</Link>
          <Link to="/auth" className="text-sm hover:text-purple-400 transition duration-300">Post a Job</Link>
          <button
            onClick={onSignIn}
            className="bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition duration-300 transform hover:scale-105"
          >
            Join Now
          </button>
        </motion.div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden bg-gray-900 p-4"
        >
          <Link to="/auth" className="block text-sm text-white hover:text-purple-400 transition duration-300 py-2">Explore Careers</Link>
          <Link to="/auth" className="block text-sm text-white hover:text-purple-400 transition duration-300 py-2">Post a Job</Link>
          <button
            onClick={onSignIn}
            className="w-full bg-purple-600 text-white px-4 py-2 rounded-full text-sm hover:bg-purple-700 transition duration-300 mt-2"
          >
            Join Now
          </button>
        </motion.div>
      )}
    </motion.header>
  );
}

function HeroSection() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          className="object-cover w-full h-full opacity-30"
        >
          <source src="/path-to-your-background-video.mp4" type="video/mp4" />
        </video>
      </div>
      <div className="container mx-auto px-6 relative z-10 text-center">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight"
        >
          Elevate Your Career with <span className="text-purple-400">CareerLaunch</span>
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg mb-8 text-gray-300 max-w-2xl mx-auto"
        >
          Discover opportunities that align with your passion and skills.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Link
            to="/auth"
            className="bg-purple-600 text-white font-semibold px-6 py-3 rounded-full text-sm hover:bg-purple-700 transition duration-300 inline-flex items-center transform hover:scale-105"
          >
            <FaSearch className="mr-2" /> Start Your Job Search
          </Link>
        </motion.div>
      </div>
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
      >
        <FaChevronDown className="text-white text-3xl animate-bounce" />
      </motion.div>
    </section>
  );
}

function FeaturedJobsSection() {
  const featuredJobs = [
    { title: "AI Research Scientist", company: "TechNova", location: "San Francisco, CA" },
    { title: "Digital Marketing Strategist", company: "GrowthPulse", location: "New York, NY" },
    { title: "Senior UX/UI Designer", company: "DesignSphere", location: "Remote" },
    { title: "Data Science Team Lead", company: "DataNexus", location: "Austin, TX" },
    { title: "Full Stack Developer", company: "WebWizards", location: "Seattle, WA" },
    { title: "Product Manager", company: "InnovateCorp", location: "Boston, MA" },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold text-center mb-10"
        >
          Featured Opportunities
        </motion.h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredJobs.map((job, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-800 rounded-lg p-5 shadow-lg hover:shadow-xl transition duration-300 transform hover:scale-105"
            >
              <h3 className="text-lg font-semibold mb-2">{job.title}</h3>
              <p className="text-purple-400 text-sm mb-3">{job.company}</p>
              <div className="flex items-center text-gray-400 text-xs">
                <FaBriefcase className="mr-2" />
                <span>{job.location}</span>
              </div>
            </motion.div>
          ))}
        </div>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-center mt-10"
        >
          <Link
            to="/auth"
            className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-full text-sm hover:bg-purple-700 transition duration-300 inline-block transform hover:scale-105"
          >
            View All Jobs
          </Link>
        </motion.div>
      </div>
    </section>
  );
}

function StatisticsSection() {
  const stats = [
    { label: "Active Job Seekers", value: "500K+" },
    { label: "Companies Hiring", value: "10K+" },
    { label: "Jobs Posted Monthly", value: "50K+" },
    { label: "Successful Placements", value: "1M+" },
  ];

  return (
    <section className="py-20 bg-purple-900">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="text-center"
            >
              <div className="text-3xl font-bold mb-2">{stat.value}</div>
              <div className="text-sm text-purple-200">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialsSection() {
  const testimonials = [
    { name: "Sarah J.", role: "Software Engineer", quote: "CareerLaunch helped me find my dream job in just weeks!" },
    { name: "Michael T.", role: "Marketing Director", quote: "The platform's AI matching is incredibly accurate." },
    { name: "Emily R.", role: "Data Scientist", quote: "I've recommended CareerLaunch to all my colleagues." },
  ];

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-6">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-2xl font-bold text-center mb-10"
        >
          What Our Users Say
        </motion.h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.1 }}
              className="bg-gray-800 p-6 rounded-lg shadow-lg"
            >
              <p className="text-sm italic mb-4">"{testimonial.quote}"</p>
              <div className="font-semibold">{testimonial.name}</div>
              <div className="text-purple-400 text-xs">{testimonial.role}</div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function CTASection({ onCreateProfile, onSignIn }) {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-800 to-indigo-900">
      <div className="container mx-auto px-6 text-center">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-3xl font-bold mb-4"
        >
          Ready to Take the Next Step?
        </motion.h2>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg mb-8 text-purple-200 max-w-2xl mx-auto"
        >
          Join CareerLaunch today and unlock a world of opportunities.
        </motion.p>
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4"
        >
          <button
            onClick={onCreateProfile}
            className="bg-white text-purple-700 px-6 py-2 rounded-full text-sm font-semibold hover:bg-gray-100 transition duration-300 transform hover:scale-105"
          >
            <FaUserPlus className="inline mr-2" /> Create Your Profile
          </button>
          <button
            onClick={onSignIn}
            className="bg-purple-600 text-white px-6 py-2 rounded-full text-sm font-semibold hover:bg-purple-700 transition duration-300 transform hover:scale-105"
          >
            Contact Us
          </button>
        </motion.div>
      </div>
    </section>
  );
}

export default HomePage;
