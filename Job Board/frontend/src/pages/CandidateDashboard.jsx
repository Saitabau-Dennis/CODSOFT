import React from "react";
import { Routes, Route, Link, useParams } from "react-router-dom";
import {
  FaSearch,
  FaMapMarkerAlt,
  FaBriefcase,
  FaUpload,
  FaUser,
} from "react-icons/fa";
import Footer from "../components/Footer";

function CandidateDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-poppins">
      <Header />
      <Routes>
        <Route index element={<JobSearch />} />
        <Route path="jobs/:id" element={<JobDetail />} />
        <Route path="apply/:id" element={<JobApplication />} />
        <Route path="profile" element={<ProfileManagement />} />
        <Route path="job-listing" element={<JobListing />} />
      </Routes>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link
          to="/candidate"
          className="text-2xl font-extrabold text-purple-500 tracking-wider"
        >
          CareerLaunch
        </Link>
        <div className="space-x-6">
          <Link
            to="/candidate/job-listing"
            className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium"
          >
            Job Listings
          </Link>
          <Link
            to="/candidate/profile"
            className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium"
          >
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}

function JobSearch() {
  return (
    <section className="bg-gray-900 text-white py-24">
      <div className="container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-8">Search for Jobs</h2>
        <div className="bg-gray-800 rounded-xl p-6 shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
              />
            </div>
            <div className="flex-1 relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="City, state, or remote"
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
              />
            </div>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 flex items-center justify-center text-base transform hover:scale-105">
              <FaSearch className="mr-2" />
              Search Jobs
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

function JobListing() {
  const jobs = [
    {
      id: 1,
      title: "AI Research Scientist",
      company: "TechNova",
      location: "San Francisco, CA",
      type: "Full-time",
    },
    {
      id: 2,
      title: "Digital Marketing Strategist",
      company: "GrowthPulse",
      location: "New York, NY",
      type: "Full-time",
    },
    {
      id: 3,
      title: "Senior UX/UI Designer",
      company: "DesignSphere",
      location: "Remote",
      type: "Contract",
    },
    {
      id: 4,
      title: "Data Science Team Lead",
      company: "DataNexus",
      location: "Austin, TX",
      type: "Full-time",
    },
  ];

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl font-bold text-center mb-12">Job Listings</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {jobs.map((job) => (
            <Link
              to={`/candidate/jobs/${job.id}`}
              key={job.id}
              className="block bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out border-l-4 border-purple-500 transform hover:scale-105"
            >
              <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
              <p className="text-purple-400 mb-3 font-medium text-lg">
                {job.company}
              </p>
              <div className="flex items-center text-gray-400 mb-2 text-base">
                <FaMapMarkerAlt className="mr-2" />
                <span>{job.location}</span>
              </div>
              <div className="flex items-center text-gray-400 text-base">
                <FaBriefcase className="mr-2" />
                <span>{job.type}</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

function JobDetail() {
  const { id } = useParams();
  const job = {
    id,
    title: "AI Research Scientist",
    company: "TechNova",
    location: "San Francisco, CA",
    type: "Full-time",
    description:
      "We are looking for an AI Research Scientist to join our team at TechNova. You will be responsible for developing and implementing state-of-the-art AI solutions.",
    requirements: [
      "PhD in Computer Science or related field",
      "Experience with machine learning and AI",
      "Strong programming skills in Python",
    ],
  };

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">{job.title}</h2>
          <p className="text-purple-400 mb-3 font-medium text-lg">
            {job.company}
          </p>
          <div className="flex items-center text-gray-400 mb-2 text-base">
            <FaMapMarkerAlt className="mr-2" />
            <span>{job.location}</span>
          </div>
          <div className="flex items-center text-gray-400 text-base mb-4">
            <FaBriefcase className="mr-2" />
            <span>{job.type}</span>
          </div>
          <p className="mb-4">{job.description}</p>
          <h3 className="text-xl font-semibold mb-2">Requirements:</h3>
          <ul className="list-disc list-inside mb-4">
            {job.requirements.map((req, index) => (
              <li key={index} className="text-gray-400">
                {req}
              </li>
            ))}
          </ul>
          <Link
            to={`/candidate/apply/${job.id}`}
            className="bg-purple-600 text-white font-semibold px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300 inline-block text-base transform hover:scale-105"
          >
            Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
}

function JobApplication() {
  const { id } = useParams();

  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Apply for Job ID: {id}</h2>
          <form className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="name">
                Name:
              </label>
              <input
                type="text"
                id="name"
                className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="email">
                Email:
              </label>
              <input
                type="email"
                id="email"
                className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-2 font-semibold" htmlFor="resume">
                Upload Resume:
              </label>
              <input type="file" id="resume" className="hidden" />
              <label
                htmlFor="resume"
                className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold text-base hover:bg-purple-700 transition duration-300 cursor-pointer inline-flex items-center transform hover:scale-105"
              >
                <FaUpload className="mr-2" /> Upload Your Resume
              </label>
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold text-base hover:bg-purple-700 transition duration-300 inline-block transform hover:scale-105"
            >
              Submit Application
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ProfileManagement() {
  return (
    <section className="py-24 bg-gray-900 text-white">
      <div className="container mx-auto px-6">
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-3xl font-bold mb-4">Profile Management</h2>
          <div className="flex flex-col space-y-4">
            <div className="flex items-center space-x-4">
              <FaUser className="text-2xl text-purple-500" />
              <div>
                <h3 className="text-xl font-semibold">John Doe</h3>
                <p className="text-gray-400">john.doe@example.com</p>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">
                Personal Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col">
                  <label className="mb-2 font-semibold" htmlFor="fullname">
                    Full Name:
                  </label>
                  <input
                    type="text"
                    id="fullname"
                    className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                  />
                </div>
                <div className="flex flex-col">
                  <label className="mb-2 font-semibold" htmlFor="email">
                    Email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                  />
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Education</h3>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold" htmlFor="degree">
                  Degree:
                </label>
                <input
                  type="text"
                  id="degree"
                  className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Experience</h3>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold" htmlFor="jobTitle">
                  Job Title:
                </label>
                <input
                  type="text"
                  id="jobTitle"
                  className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                />
              </div>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-2">Skills</h3>
              <div className="flex flex-col">
                <label className="mb-2 font-semibold" htmlFor="skills">
                  Skills:
                </label>
                <textarea
                  id="skills"
                  className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-base"
                  rows="3"
                ></textarea>
              </div>
            </div>
            <button className="bg-purple-600 text-white px-8 py-3 rounded-full font-semibold text-base hover:bg-purple-700 transition duration-300 inline-block transform hover:scale-105">
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}

export default CandidateDashboard;
