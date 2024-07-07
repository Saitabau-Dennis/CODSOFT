// HomePage.js
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaMapMarkerAlt, FaBriefcase, FaRocket } from "react-icons/fa";
import Footer from "../components/Footer";

function HomePage() {
  const navigate = useNavigate();

  const handleAuthAction = (action) => {
    navigate("/auth", { state: { action } });
  };

  return (
    <div className="min-h-screen bg-gray-900 font-poppins">
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
  const handleNavigation = (e) => {
    if (!isLoggedIn) {
      e.preventDefault();
      onSignIn();
    }
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <div className="text-2xl font-extrabold text-purple-500 tracking-wider">CareerLaunch</div>
        <div className="space-x-6">
          <Link
            to="/find-jobs"
            onClick={handleNavigation}
            className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium"
          >
            Explore Careers
          </Link>
          <Link
            to="/employer-dashboard"
            onClick={handleNavigation}
            className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium"
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
      </nav>
    </header>
  );
}

function HeroSection() {
  return (
    <section className="bg-gray-900 text-white py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-12">
          <h1 className="text-5xl font-extrabold mb-4 leading-tight">
            Launch Your <span className="text-purple-500 animate-pulse">Dream Career</span>
          </h1>
          <p className="text-xl mb-8 text-gray-400 max-w-2xl mx-auto leading-relaxed">
            Discover opportunities that ignite your passion and propel your career forward.
          </p>
        </div>
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
        <h2 className="text-3xl font-bold text-center mb-12">
          Featured Opportunities
        </h2>
        <div className="grid md:grid-cols-2 gap-8">
          {featuredJobs.map((job, index) => (
            <div
              key={index}
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
            </div>
          ))}
        </div>
        <div className="text-center mt-12">
          <Link
            to="/find-jobs"
            className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300 inline-block text-base transform hover:scale-105"
          >
            Explore All Opportunities →
          </Link>
        </div>
      </div>
    </section>
  );
}

function CTASection({ onCreateProfile, onContactUs }) {
  return (
    <section className="bg-purple-700 py-24 relative overflow-hidden">
      <div className="container mx-auto px-6 text-center relative z-10">
        <h2 className="text-4xl font-extrabold mb-4 text-white">
          Ready to Skyrocket Your Career?
        </h2>
        <p className="text-xl mb-8 text-purple-200 max-w-2xl mx-auto">
          Join thousands of professionals discovering their dream roles.
        </p>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-4 md:space-y-0 md:space-x-4">
          <button
            onClick={onCreateProfile}
            className="bg-white text-purple-700 px-8 py-3 rounded-full font-semibold text-base hover:bg-gray-100 transition duration-300 transform hover:scale-105 flex items-center"
          >
            <FaRocket className="mr-2" /> Create Your Profile
          </button>
          <button
            onClick={onContactUs}
            className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold text-base hover:bg-purple-800 transition duration-300 transform hover:scale-105"
          >
            Get in Touch
          </button>
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-br from-purple-800 to-purple-600 opacity-30"></div>
    </section>
  );
}

export default HomePage;
