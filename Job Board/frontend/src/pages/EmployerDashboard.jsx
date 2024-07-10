import React, { useState, useEffect } from "react";
import { Link, Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";
import { motion } from "framer-motion";
import Footer from "../components/Footer";
import {
  FaBuilding,
  FaMapMarkerAlt,
  FaDollarSign,
  FaUserTie,
  FaPlus,
  FaEdit,
  FaTrash,
} from "react-icons/fa";

function EmployerDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 font-poppins text-white bg-opacity-95 ">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-purple-500 mb-8">
          Employer Dashboard
        </h1>
        <Routes>
          <Route path="/" element={<JobManagement />} />
          <Route path="/post-job" element={<PostJob />} />
          <Route path="/candidates" element={<CandidateSection />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex justify-between items-center">
          <Link
            to="/employer"
            className="text-2xl font-extrabold text-purple-500 tracking-wider"
          >
            CareerLaunch
          </Link>
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white focus:outline-none"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  d={
                    isMenuOpen
                      ? "M6 18L18 6M6 6l12 12"
                      : "M4 6h16M4 12h16M4 18h16"
                  }
                ></path>
              </svg>
            </button>
          </div>
          <div className="hidden md:flex space-x-6">
            <Link
              to="/employer"
              className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/employer/post-job"
             className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium"
            >
              Post Job
            </Link>
            <Link
              to="/employer/candidates"
              className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium"
            >
              Candidates
            </Link>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4">
            <Link
              to="/employer"
              className="block py-2 text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium"
            >
              Dashboard
            </Link>
            <Link
              to="/employer/post-job"
              className="block py-2 text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium"
            >
              Post Job
            </Link>
            <Link
              to="/employer/candidates"
              className="block py-2 text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium"
            >
              Candidates
            </Link>
          </div>
        )}
      </nav>
    </header>
  );
}

function DashboardOverview() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <motion.div
        className="bg-gray-800 rounded-xl p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-xl font-semibold mb-2">Active Jobs</h3>
        <p className="text-3xl font-bold text-purple-500"></p>
      </motion.div>
      <motion.div
        className="bg-gray-800 rounded-xl p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <h3 className="text-xl font-semibold mb-2">Total Applications</h3>
        <p className="text-3xl font-bold text-purple-500"></p>
      </motion.div>
      <motion.div
        className="bg-gray-800 rounded-xl p-6 shadow-xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        <h3 className="text-xl font-semibold mb-2">Interviews Scheduled</h3>
        <p className="text-3xl font-bold text-purple-500"></p>
      </motion.div>
    </div>
  );
}

function JobManagement() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("/api/jobs/employer");
      setJobs(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setJobs([]);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/jobs/${jobId}`);
      setJobs((prevJobs) => prevJobs.filter((job) => job.id !== jobId));
    } catch (error) {
      console.error("Error deleting job:", error);
    }
  };

  return (
    <div>
      <DashboardOverview />
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Your Job Listings</h2>
        <Link
          to="/employer/post-job"
          className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-4 py-2 rounded-full hover:from-purple-700 hover:to-purple-800 transition duration-300 flex items-center shadow-md"
        >
          <FaPlus className="mr-2" /> Post New Job
        </Link>
      </div>
      <div className="mb-16">
        <JobListings jobs={jobs} handleDeleteJob={handleDeleteJob} />
      </div>
    </div>
  );
}

function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    company: "",
    location: "",
    salary: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post("/api/jobs", { ...formData, posted_by: 1 });
      navigate("/employer");
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>
      <JobForm
        formData={formData}
        handleInputChange={handleInputChange}
        handlePostJob={handlePostJob}
      />
    </motion.div>
  );
}

function JobForm({ formData, handleInputChange, handlePostJob }) {
  return (
    <form onSubmit={handlePostJob} className="space-y-4">
      <InputField
        label="Job Title"
        name="title"
        value={formData.title}
        onChange={handleInputChange}
      />
      <TextAreaField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <InputField
          label="Company"
          name="company"
          value={formData.company}
          onChange={handleInputChange}
        />
        <InputField
          label="Location"
          name="location"
          value={formData.location}
          onChange={handleInputChange}
        />
        <InputField
          label="Salary"
          name="salary"
          value={formData.salary}
          onChange={handleInputChange}
        />
      </div>
      <button
        type="submit"
        className="bg-gradient-to-r from-purple-600 to-purple-700 text-white px-6 py-2 rounded-full hover:from-purple-700 hover:to-purple-800 transition duration-300 shadow-md"
      >
        Post Job
      </button>
    </form>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div className="relative">
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 peer pt-6"
        required
      />
      <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:left-3 peer-focus:text-purple-500 peer-focus:dark:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-3">
        {label}
      </label>
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }) {
  return (
    <div className="relative">
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        rows="4"
        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 peer pt-6"
        required
      />
      <label className="absolute text-sm text-gray-400 duration-300 transform -translate-y-3 scale-75 top-4 z-10 origin-[0] left-3 peer-focus:left-3 peer-focus:text-purple-500 peer-focus:dark:text-purple-400 peer-placeholder-shown:scale-100 peer-placeholder-shown:-translate-y-1/2 peer-placeholder-shown:top-1/2 peer-focus:top-4 peer-focus:scale-75 peer-focus:-translate-y-3">
        {label}
      </label>
    </div>
  );
}

function JobListings({ jobs, handleDeleteJob }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <motion.div
          key={job.id}
          className="bg-gray-800 rounded-xl p-6 shadow-xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-2">{job.title}</h3>
          <p className="text-gray-400">{job.description}</p>
          <div className="flex items-center mt-4">
            <FaBuilding className="text-gray-500 mr-2" /> {job.company}
          </div>
          <div className="flex items-center mt-2">
            <FaMapMarkerAlt className="text-gray-500 mr-2" /> {job.location}
          </div>
          <div className="flex items-center mt-2">
            <FaDollarSign className="text-gray-500 mr-2" /> {job.salary}
          </div>
          <div className="flex justify-between items-center mt-4">
            <Link
              to={`/employer/edit-job/${job.id}`}
              className="text-purple-500 hover:underline"
            >
              <FaEdit className="mr-2" /> Edit
            </Link>
            <button
              onClick={() => handleDeleteJob(job.id)}
              className="text-red-500 hover:underline flex items-center"
            >
              <FaTrash className="mr-2" /> Delete
            </button>
          </div>
        </motion.div>
      ))}
    </div>
  );
}

function CandidateSection() {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("/api/candidates");
      setCandidates(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
    }
  };

  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 shadow-xl"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <h2 className="text-2xl font-semibold mb-4">Candidates</h2>
      <CandidateList candidates={candidates} />
    </motion.div>
  );
}

function CandidateList({ candidates }) {
  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <motion.div
          key={candidate.id}
          className="bg-gray-700 rounded-lg p-4 shadow-lg"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-xl font-semibold mb-2">{candidate.name}</h3>
          <p className="text-gray-400">{candidate.email}</p>
          <div className="flex items-center mt-2">
            <FaUserTie className="text-gray-500 mr-2" /> {candidate.position}
          </div>
        </motion.div>
      ))}
    </div>
  );
}

export default EmployerDashboard;
