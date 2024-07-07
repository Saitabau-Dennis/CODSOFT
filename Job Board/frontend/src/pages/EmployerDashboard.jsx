import React, { useState, useEffect } from 'react';
import { Link, Routes, Route, useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';
import { FaBuilding, FaMapMarkerAlt, FaDollarSign, FaUserTie, FaPlus, FaEdit, FaTrash } from 'react-icons/fa';

function EmployerDashboard() {
  return (
    <div className="min-h-screen bg-gray-900 font-poppins text-white">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold text-purple-500 mb-8">Employer Dashboard</h1>
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
  return (
    <header className="bg-gray-900 text-white shadow-lg sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/employer" className="text-2xl font-extrabold text-purple-500 tracking-wider">CareerLaunch</Link>
        <div className="space-x-6">
          <Link to="/employer" className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium">Dashboard</Link>
          <Link to="/employer/post-job" className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium">Post Job</Link>
          <Link to="/employer/candidates" className="text-base text-gray-300 hover:text-purple-400 transition duration-300 font-medium">Candidates</Link>
        </div>
      </nav>
    </header>
  );
}

function JobManagement() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get('/api/jobs/employer');
      setJobs(response.data);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  const handleDeleteJob = async (jobId) => {
    try {
      await axios.delete(`/api/jobs/${jobId}`);
      setJobs(prevJobs => prevJobs.filter(job => job.id !== jobId));
    } catch (error) {
      console.error('Error deleting job:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-semibold">Your Job Listings</h2>
        <Link to="/employer/post-job" className="bg-purple-600 text-white px-4 py-2 rounded-full hover:bg-purple-700 transition duration-300 flex items-center">
          <FaPlus className="mr-2" /> Post New Job
        </Link>
      </div>
      <JobListings jobs={jobs} handleDeleteJob={handleDeleteJob} />
    </div>
  );
}

function PostJob() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    company: '',
    location: '',
    salary: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handlePostJob = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/jobs', { ...formData, posted_by: 1 }); // Replace 1 with authenticated employer's user id
      navigate('/employer');
    } catch (error) {
      console.error('Error posting job:', error);
      // Handle error (e.g., show error message to user)
    }
  };

  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Post a New Job</h2>
      <JobForm
        formData={formData}
        handleInputChange={handleInputChange}
        handlePostJob={handlePostJob}
      />
    </div>
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
        className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300"
      >
        Post Job
      </button>
    </form>
  );
}

function InputField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <input
        type="text"
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        required
      />
    </div>
  );
}

function TextAreaField({ label, name, value, onChange }) {
  return (
    <div>
      <label className="block text-sm font-medium mb-1">{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        className="w-full px-3 py-2 bg-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 h-32"
        required
      />
    </div>
  );
}

function JobListings({ jobs, handleDeleteJob }) {
  if (!Array.isArray(jobs)) {
    return <p className="text-gray-400">No jobs available.</p>;
  }

  return (
    <div className="space-y-4">
      {jobs.length === 0 ? (
        <p className="text-gray-400">You haven't posted any jobs yet.</p>
      ) : (
        jobs.map(job => (
          <JobCard key={job.id} job={job} onDelete={handleDeleteJob} />
        ))
      )}
    </div>
  );
}
function JobCard({ job, onDelete }) {
  return (
    <div className="bg-gray-800 rounded-lg p-4 flex justify-between items-center">
      <div>
        <h3 className="text-xl font-semibold">{job.title}</h3>
        <p className="text-gray-400 flex items-center mt-1">
          <FaBuilding className="mr-2" /> {job.company}
        </p>
        <p className="text-gray-400 flex items-center mt-1">
          <FaMapMarkerAlt className="mr-2" /> {job.location}
        </p>
        <p className="text-gray-400 flex items-center mt-1">
          <FaDollarSign className="mr-2" /> {job.salary}
        </p>
      </div>
      <div className="flex space-x-2">
        <Link to={`/employer/edit-job/${job.id}`} className="text-blue-400 hover:text-blue-300 transition duration-300">
          <FaEdit />
        </Link>
        <button 
          onClick={() => onDelete(job.id)} 
          className="text-red-400 hover:text-red-300 transition duration-300"
        >
          <FaTrash />
        </button>
      </div>
    </div>
  );
}

function CandidateSection() {
  return (
    <div className="bg-gray-800 rounded-xl p-6 shadow-xl">
      <h2 className="text-2xl font-semibold mb-4">Connect with Candidates</h2>
      <p className="text-gray-400 mb-4">Browse and connect with potential candidates for your job listings.</p>
      <button className="bg-purple-600 text-white px-6 py-2 rounded-full hover:bg-purple-700 transition duration-300 flex items-center">
        <FaUserTie className="mr-2" /> View Candidates
      </button>
    </div>
  );
}

export default EmployerDashboard;