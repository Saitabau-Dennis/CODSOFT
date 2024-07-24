import React, { useState, useEffect } from "react";
import { Routes, Route, Link, useParams, useNavigate } from "react-router-dom";
import { FaSearch, FaMapMarkerAlt, FaBriefcase, FaUpload, FaUser, FaDollarSign, FaCalendar } from "react-icons/fa";
import Footer from "../components/Footer";
import axios from "axios";

const API_BASE_URL = "http://localhost:5000/api";

function CandidateDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 text-white font-poppins flex flex-col text-sm">
      <Header />
      <main className="flex-grow">
        <Routes>
          <Route index element={<JobSearch />} />
          <Route path="jobs" element={<JobListing />} />
          <Route path="jobs/:id" element={<JobDetail />} />
          <Route path="apply/:id" element={<JobApplication />} />
          <Route path="profile" element={<ProfileManagement />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <header className="bg-gray-800 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <Link to="/candidate" className="text-xl font-bold text-purple-500">
          CareerLaunch
        </Link>
        <div className="space-x-4">
          <Link to="/candidate/jobs" className="text-sm hover:text-purple-400 transition duration-300">
            Job Listings
          </Link>
          <Link to="/candidate/profile" className="text-sm hover:text-purple-400 transition duration-300">
            Profile
          </Link>
        </div>
      </nav>
    </header>
  );
}

function JobSearch() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  const [location, setLocation] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/candidate/jobs?search=${searchTerm}&location=${location}`);
  };

  return (
    <section className="bg-gray-900 text-white py-12 mb-12">
      <div className="container mx-auto px-4 text-center">
        <h1 className="text-3xl font-bold mb-3">Find Your Dream Job</h1>
        <p className="text-base mb-6">Discover opportunities that match your skills and aspirations</p>
        <form onSubmit={handleSearch} className="bg-gray-800 rounded-xl p-4 shadow-2xl max-w-4xl mx-auto">
          <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
            <div className="flex-1 relative">
              <FaSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Job title, keywords, or company"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex-1 relative">
              <FaMapMarkerAlt className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="City, state, or remote"
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
            <button
              type="submit"
              className="bg-purple-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-purple-700 transition duration-300 flex items-center justify-center text-sm"
            >
              <FaSearch className="mr-2" />
              Search Jobs
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function JobListing() {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchJobs(currentPage);
  }, [currentPage]);

  const fetchJobs = async (page) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await axios.get(`${API_BASE_URL}/jobs?page=${page}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      const { jobs, totalPages } = response.data;
      setJobs(jobs);
      setTotalPages(totalPages);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching jobs:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-bold text-center mb-6">Job Listings</h2>
        {jobs.length > 0 ? (
          <div className="grid sm:grid-cols-2 gap-4">
            {jobs.map((job) => (
              <Link
                to={`/candidate/jobs/${job.id}`}
                key={job.id}
                className="block bg-gray-800 rounded-xl p-4 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out border-l-4 border-purple-500"
              >
                <h3 className="text-lg font-semibold mb-1">{job.title}</h3>
                <p className="text-purple-400 mb-2 text-sm">{job.company}</p>
                <div className="flex items-center text-gray-400 mb-1 text-xs">
                  <FaMapMarkerAlt className="mr-1" />
                  <span>{job.location}</span>
                </div>
                <div className="flex items-center text-gray-400 text-xs">
                  <FaBriefcase className="mr-1" />
                  <span>{job.job_type}</span>
                </div>
                <p className="text-gray-400 text-xs mt-2 truncate">{job.description}</p>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center">No jobs found.</p>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`mx-1 px-3 py-1 rounded ${
                  currentPage === i + 1 ? "bg-purple-600" : "bg-gray-700"
                }`}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function JobDetail() {
  const { id } = useParams();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          throw new Error("No authentication token found. Please log in.");
        }

        const response = await axios.get(`${API_BASE_URL}/jobs/${id}`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        setJob(response.data);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching job details:", err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;
  if (!job) return <div className="text-center py-12">Job not found</div>;

  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-3xl font-bold mb-2">{job.title}</h2>
          <p className="text-purple-400 mb-4 text-lg">{job.company}</p>
          <div className="grid grid-cols-2 gap-4 mb-6">
            <div className="flex items-center text-gray-400 text-sm">
              <FaMapMarkerAlt className="mr-2" />
              <span>{job.location}</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <FaBriefcase className="mr-2" />
              <span>{job.job_type}</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <FaDollarSign className="mr-2" />
              <span>{job.salary}</span>
            </div>
            <div className="flex items-center text-gray-400 text-sm">
              <FaCalendar className="mr-2" />
              <span>Posted on: {new Date(job.created_at).toLocaleDateString()}</span>
            </div>
          </div>
          <h3 className="text-xl font-semibold mb-2">Job Description:</h3>
          <p className="mb-6 text-sm">{job.description}</p>
          <h3 className="text-xl font-semibold mb-2">Requirements:</h3>
          <ul className="list-disc list-inside mb-6 text-sm">
            {job.requirements.split("\n").map((req, index) => (
              <li key={index} className="text-gray-400 mb-1">{req}</li>
            ))}
          </ul>
          <Link
            to={`/candidate/apply/${job.id}`}
            className="bg-purple-600 text-white font-semibold px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300 text-sm inline-block"
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
  const [formData, setFormData] = useState({ name: "", email: "", resume: null });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e) => {
    setFormData(prev => ({ ...prev, resume: e.target.files[0] }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("resume", formData.resume);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      await axios.post(`${API_BASE_URL}/jobs/${id}/apply`, formDataToSend, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`
        },
      });
      setSuccess(true);
    } catch (err) {
      console.error("Error submitting application:", err);
      setError(err.message);
    }

    setLoading(false);
  };

  if (success) {
    return (
      <section className="py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
            <h2 className="text-2xl font-bold mb-4">Application Submitted</h2>
            <p>Your application has been successfully submitted. We'll be in touch soon!</p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 bg-gray-900 text-white">
      <div className="container mx-auto px-4">
        <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
          <h2 className="text-2xl font-bold mb-4">Apply for Job ID: {id}</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm" htmlFor="name">Name:</label>
              <input
                type="text"
                id="name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
                className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm" htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
               className="px-4 py-2 rounded-lg border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
                required
              />
            </div>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-sm" htmlFor="resume">Upload Resume:</label>
              <input
                type="file"
                id="resume"
                onChange={handleFileChange}
                className="hidden"
                required
              ></input>
              <label
                htmlFor="resume"
                className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-purple-700 transition duration-300 cursor-pointer inline-flex items-center"
              >
                <FaUpload className="mr-2" />
                {formData.resume ? formData.resume.name : "Upload Your Resume"}
              </label>
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-purple-600 text-white px-6 py-2 rounded-full font-semibold text-sm hover:bg-purple-700 transition duration-300 inline-block"
            >
              {loading ? "Submitting..." : "Submit Application"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function ProfileManagement() {
  const [profile, setProfile] = useState({
    fullName: "",
    email: "",
    degree: "",
    jobTitle: "",
    skills: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      const response = await axios.get(`${API_BASE_URL}/profile`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setProfile(response.data);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching profile:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error("No authentication token found. Please log in.");
      }

      await axios.put(`${API_BASE_URL}/profile`, profile, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setLoading(false);
      alert("Profile updated successfully!");
    } catch (err) {
      console.error("Error updating profile:", err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) return <div className="text-center py-12">Loading...</div>;
  if (error) return <div className="text-center py-12 text-red-500">{error}</div>;

  return (
    <section className="py-8 bg-gray-900 text-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <div className="bg-gray-800 rounded-lg p-4 shadow-lg">
          <h2 className="text-xl font-bold mb-4">Profile Management</h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <InputField
              label="Full Name"
              id="fullName"
              type="text"
              value={profile.fullName}
              onChange={handleInputChange}
            />
            <InputField
              label="Email"
              id="email"
              type="email"
              value={profile.email}
              onChange={handleInputChange}
            />
            <InputField
              label="Degree"
              id="degree"
              type="text"
              value={profile.degree}
              onChange={handleInputChange}
            />
            <InputField
              label="Job Title"
              id="jobTitle"
              type="text"
              value={profile.jobTitle}
              onChange={handleInputChange}
            />
            <div className="flex flex-col">
              <label className="mb-1 text-xs font-semibold" htmlFor="skills">Skills:</label>
              <textarea
                id="skills"
                name="skills"
                value={profile.skills}
                onChange={handleInputChange}
                className="px-3 py-2 rounded border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 text-xs"
                rows="3"
              ></textarea>
            </div>
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 text-white px-4 py-2 rounded font-semibold text-sm hover:bg-purple-700 transition duration-300"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}

function InputField({ label, id, type, value, onChange }) {
  return (
    <div className="flex flex-col">
      <label className="mb-1 text-xs font-semibold" htmlFor={id}>
        {label}:
      </label>
      <input
        type={type}
        id={id}
        name={id}
        value={value}
        onChange={onChange}
        className="px-3 py-2 rounded border border-gray-700 bg-gray-700 text-white focus:outline-none focus:ring-1 focus:ring-purple-500 text-xs"
      />
    </div>
  );
}
<Footer/>
export default CandidateDashboard;
