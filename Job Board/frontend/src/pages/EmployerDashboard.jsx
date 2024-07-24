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
  FaBriefcase,
  FaFileAlt,
  FaCalendarCheck,
  FaSignOutAlt,
} from "react-icons/fa";

function EmployerDashboard() {
  const [jobs, setJobs] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    jobType: "",
    location: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    fetchJobs();
  }, [currentPage, searchTerm, filterOptions]);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/jobs", {
        headers: { Authorization: `Bearer ${token}` },
        params: {
          page: currentPage,
          search: searchTerm,
          ...filterOptions,
        },
      });
      setJobs(response.data.jobs || []);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      setError("Failed to fetch jobs");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://localhost:5000/api/jobs/${jobId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      fetchJobs();
    } catch (error) {
      setError("Error deleting job");
    }
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleFilter = (options) => {
    setFilterOptions(options);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gray-900 font-poppins text-white bg-opacity-95">
      <Header handleLogout={handleLogout} />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold text-purple-500 mb-8">
          Employer Dashboard
        </h1>
        <Routes>
          <Route
            path="/"
            element={
              <JobManagement
                jobs={jobs}
                isLoading={isLoading}
                error={error}
                handleDeleteJob={handleDeleteJob}
                handleSearch={handleSearch}
                handleFilter={handleFilter}
                currentPage={currentPage}
                totalPages={totalPages}
                handlePageChange={handlePageChange}
              />
            }
          />
          <Route
            path="/post-job"
            element={
              <PostJob
                fetchJobs={fetchJobs}
                setError={setError}
                setSuccess={setSuccess}
              />
            }
          />
          <Route path="/candidates" element={<CandidateSection />} />
          <Route path="/applications" element={<ApplicationTracking />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}
function Header({ handleLogout }) {
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
          <div className="hidden md:flex space-x-6 items-center">
            <NavLink to="/employer">Dashboard</NavLink>
            <NavLink to="/employer/post-job">Post Job</NavLink>
            <NavLink to="/employer/candidates">Candidates</NavLink>
            <NavLink to="/employer/applications">Applications</NavLink>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        </div>
        {isMenuOpen && (
          <div className="md:hidden mt-4 space-y-2">
            <NavLink to="/employer">Dashboard</NavLink>
            <NavLink to="/employer/post-job">Post Job</NavLink>
            <NavLink to="/employer/candidates">Candidates</NavLink>
            <NavLink to="/employer/applications">Applications</NavLink>
            <button
              onClick={handleLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-full transition duration-300 flex items-center w-full justify-center mt-4"
            >
              <FaSignOutAlt className="mr-2" />
              Logout
            </button>
          </div>
        )}
      </nav>
    </header>
  );
}

function NavLink({ to, children }) {
  return (
    <Link
      to={to}
      className="block md:inline-block py-2 text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium"
    >
      {children}
    </Link>
  );
}
function DashboardOverview() {
  const [stats, setStats] = useState({
    activeJobs: 0,
    totalApplications: 0,
    interviewsScheduled: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/employer/stats",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setStats(response.data);
    } catch (error) {
      console.error("Error fetching stats:", error);
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
      <StatCard
        title="Active Jobs"
        value={stats.activeJobs}
        icon={FaBriefcase}
      />
      <StatCard
        title="Total Applications"
        value={stats.totalApplications}
        icon={FaFileAlt}
      />
      <StatCard
        title="Interviews Scheduled"
        value={stats.interviewsScheduled}
        icon={FaCalendarCheck}
      />
    </div>
  );
}

function StatCard({ title, value, icon: Icon }) {
  return (
    <motion.div
      className="bg-gray-800 rounded-xl p-6 shadow-xl flex items-center"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="mr-4">
        <Icon className="text-4xl text-purple-500" />
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-3xl font-bold text-purple-500">{value}</p>
      </div>
    </motion.div>
  );
}

function JobManagement({
  jobs,
  isLoading,
  error,
  handleDeleteJob,
  handleSearch,
  handleFilter,
  currentPage,
  totalPages,
  handlePageChange,
}) {
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
      <SearchAndFilter onSearch={handleSearch} onFilter={handleFilter} />
      <div className="mb-16">
        {isLoading ? (
          <p>Loading jobs...</p>
        ) : error ? (
          <p className="text-red-500">{error}</p>
        ) : (
          <JobListings jobs={jobs} handleDeleteJob={handleDeleteJob} />
        )}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}
// Add the SearchAndFilter component
function SearchAndFilter({ onSearch, onFilter }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterOptions, setFilterOptions] = useState({
    jobType: "",
    location: "",
  });

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilterOptions((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(searchTerm);
    onFilter(filterOptions);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <div className="flex flex-wrap -mx-2 mb-4">
        <div className="w-full md:w-1/2 px-2 mb-4 md:mb-0">
          <input
            type="text"
            placeholder="Search jobs..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        <div className="w-full md:w-1/4 px-2 mb-4 md:mb-0">
          <select
            name="jobType"
            value={filterOptions.jobType}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Job Types</option>
            <option value="full-time">Full Time</option>
            <option value="part-time">Part Time</option>
            <option value="contract">Contract</option>
          </select>
        </div>
        <div className="w-full md:w-1/4 px-2">
          <select
            name="location"
            value={filterOptions.location}
            onChange={handleFilterChange}
            className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
          >
            <option value="">All Locations</option>
            <option value="remote">Remote</option>
            <option value="on-site">On-site</option>
            <option value="hybrid">Hybrid</option>
          </select>
        </div>
      </div>
      <button
        type="submit"
        className="bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition duration-300"
      >
        Apply Filters
      </button>
    </form>
  );
}
function PostJob({ fetchJobs, setError, setSuccess }) {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    requirements: "",
    company: "",
    location: "",
    salary: "",
    jobType: "",
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
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://localhost:5000/api/jobs",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      console.log("Job posted successfully:", response.data);
      setSuccess("Job posted successfully!");
      setFormData({
        title: "",
        description: "",
        requirements: "",
        company: "",
        location: "",
        salary: "",
        jobType: "",
      });
      fetchJobs();
    } catch (error) {
      console.error(
        "Error posting job:",
        error.response?.data || error.message
      );
      setError(
        "Error posting job: " + (error.response?.data?.error || error.message)
      );
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
      <TextAreaField
        label="Requirements"
        name="requirements"
        value={formData.requirements}
        onChange={handleInputChange}
      />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
        <InputField
          label="Job Type"
          name="jobType"
          value={formData.jobType}
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
  if (!jobs || jobs.length === 0) {
    return <p>No jobs available.</p>;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} handleDeleteJob={handleDeleteJob} />
      ))}
    </div>
  );
}

function JobCard({ job, handleDeleteJob }) {
  return (
    <motion.div
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
  );
}

function Pagination({ currentPage, totalPages, onPageChange }) {
  return (
    <div className="flex justify-center space-x-2">
      {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`px-4 py-2 rounded-full ${
            currentPage === page
              ? "bg-purple-500 text-white"
              : "bg-gray-700 text-gray-300 hover:bg-gray-600"
          }`}
        >
          {page}
        </button>
      ))}
    </div>
  );
}

function CandidateSection() {
  const [candidates, setCandidates] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchCandidates();
  }, [currentPage]);

  const fetchCandidates = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/candidates", {
        headers: { Authorization: `Bearer ${token}` },
        params: { page: currentPage },
      });
      setCandidates(response.data.candidates || []);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching candidates:", error);
      setCandidates([]);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
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
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </motion.div>
  );
}

function CandidateList({ candidates }) {
  if (!candidates || candidates.length === 0) {
    return <p>No candidates available.</p>;
  }

  return (
    <div className="space-y-4">
      {candidates.map((candidate) => (
        <CandidateCard key={candidate.id} candidate={candidate} />
      ))}
    </div>
  );
}

function CandidateCard({ candidate }) {
  return (
    <motion.div
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
      <button className="mt-4 bg-purple-500 hover:bg-purple-600 text-white px-4 py-2 rounded-full transition duration-300">
        View Profile
      </button>
    </motion.div>
  );
}

function ApplicationTracking() {
  const [applications, setApplications] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchApplications();
  }, [currentPage]);

  const fetchApplications = async () => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.get(
        "http://localhost:5000/api/applications",
        {
          headers: { Authorization: `Bearer ${token}` },
          params: { page: currentPage },
        }
      );
      setApplications(response.data.applications || []);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching applications:", error);
      setApplications([]);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="mt-12">
      <h2 className="text-2xl font-semibold mb-4">Application Tracking</h2>
      {applications.length === 0 ? (
        <p>No applications available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full bg-gray-800 rounded-lg overflow-hidden">
            <thead className="bg-gray-700">
              <tr>
                <th className="px-4 py-2 text-left">Candidate</th>
                <th className="px-4 py-2 text-left">Job Title</th>
                <th className="px-4 py-2 text-left">Status</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {applications.map((app) => (
                <tr key={app.id} className="border-t border-gray-700">
                  <td className="px-4 py-2">{app.candidateName}</td>
                  <td className="px-4 py-2">{app.jobTitle}</td>
                  <td className="px-4 py-2">{app.status}</td>
                  <td className="px-4 py-2">
                    <button className="text-purple-500 hover:underline mr-2">
                      View
                    </button>
                    <button className="text-purple-500 hover:underline">
                      Update Status
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={handlePageChange}
      />
    </div>
  );
}

export default EmployerDashboard;
