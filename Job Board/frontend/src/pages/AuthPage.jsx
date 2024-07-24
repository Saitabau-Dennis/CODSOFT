import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaEnvelope, FaLock, FaUser } from "react-icons/fa";
import axios from "axios";
import { motion } from "framer-motion";

function AuthForm() {
  const location = useLocation();
  const navigate = useNavigate();
  const [formState, setFormState] = useState({
    isSignUp: location.state?.action === "signup",
    email: "",
    password: "",
    confirmPassword: "",
    name: "",
    userType: "candidate",
    error: "",
    success: "",
    isLoading: false,
  });

  useEffect(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userType");
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState((prevState) => ({ ...prevState, [name]: value, error: "" }));
  };

  const toggleFormMode = () => {
    setFormState((prevState) => ({
      ...prevState,
      isSignUp: !prevState.isSignUp,
      error: "",
      success: "",
    }));
  };

  const validateForm = () => {
    if (!formState.email || !formState.password) {
      setFormState((prevState) => ({
        ...prevState,
        error: "Email and password are required.",
      }));
      return false;
    }
    if (formState.isSignUp) {
      if (!formState.name || !formState.userType) {
        setFormState((prevState) => ({
          ...prevState,
          error: "Name and user type are required for registration.",
        }));
        return false;
      }
      if (formState.password !== formState.confirmPassword) {
        setFormState((prevState) => ({
          ...prevState,
          error: "Passwords do not match.",
        }));
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;
  
    setFormState((prevState) => ({
      ...prevState,
      isLoading: true,
      error: "",
      success: "",
    }));
    const { isSignUp, email, password, name, userType } = formState;
  
    // Replace this with your actual API URL
    const API_URL = "http://localhost:5000";
  
    try {
      let response;
      if (isSignUp) {
        response = await axios.post(
          `${API_URL}/api/auth/register`,
          {
            name,
            email,
            password,
            userType,
          }
        );
        setFormState((prevState) => ({
          ...prevState,
          isSignUp: false,
          success: "Registration successful! Please log in.",
          email: "",
          password: "",
          confirmPassword: "",
          name: "",
          userType: "candidate",
        }));
      } else {
        response = await axios.post(
          `${API_URL}/api/auth/login`,
          {
            email,
            password,
          }
        );
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userType", response.data.userType);
        
        if (response.data.userType === "candidate") {
          navigate("/candidate");
        } else if (response.data.userType === "employer") {
          navigate("/employer");
        } else {
          navigate("/dashboard");
        }
      }
    } catch (error) {
      setFormState((prevState) => ({
        ...prevState,
        error:
          error.response?.data?.error ||
          "An unexpected error occurred. Please try again.",
      }));
    } finally {
      setFormState((prevState) => ({ ...prevState, isLoading: false }));
    }
  };
  
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex justify-center items-center py-12 px-4 sm:px-6 lg:px-8 font-poppins">
      <motion.div 
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-md w-full space-y-8 p-10 bg-gray-800 rounded-3xl shadow-2xl text-white relative overflow-hidden"
      >
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-purple-400 via-pink-500 to-red-500"></div>
        <div className="text-center">
          <motion.h2 
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.3 }}
            className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600"
          >
            {formState.isSignUp ? "Join CareerLaunch" : "Welcome Back"}
          </motion.h2>
          <p className="mt-2 text-sm text-gray-400">
            {formState.isSignUp
              ? "Start your professional journey today"
              : "Sign in to access your account"}
          </p>
        </div>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          {formState.isSignUp && (
            <div className="group">
              <label htmlFor="name" className="sr-only">
                Full Name
              </label>
              <div className="relative">
                <FaUser className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
                <input
                  type="text"
                  name="name"
                  id="name"
                  autoComplete="name"
                  className="pl-10 pr-3 py-3 w-full rounded-lg border-2 border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ease-in-out"
                  placeholder="Full Name"
                  value={formState.name}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}
          <div className="group">
            <label htmlFor="email" className="sr-only">
              Email Address
            </label>
            <div className="relative">
              <FaEnvelope className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
              <input
                type="email"
                name="email"
                id="email"
                autoComplete="email"
                required
                className="pl-10 pr-3 py-3 w-full rounded-lg border-2 border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ease-in-out"
                placeholder="Email Address"
                value={formState.email}
                onChange={handleChange}
              />
            </div>
          </div>
          <div className="group">
            <label htmlFor="password" className="sr-only">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
              <input
                type="password"
                name="password"
                id="password"
                autoComplete="current-password"
                required
                className="pl-10 pr-3 py-3 w-full rounded-lg border-2 border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ease-in-out"
                placeholder="Password"
                value={formState.password}
                onChange={handleChange}
              />
            </div>
          </div>
          {formState.isSignUp && (
            <>
              <div className="group">
                <label htmlFor="confirmPassword" className="sr-only">
                  Confirm Password
                </label>
                <div className="relative">
                  <FaLock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 group-hover:text-purple-400 transition-colors duration-200" />
                  <input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    autoComplete="current-password"
                    required
                    className="pl-10 pr-3 py-3 w-full rounded-lg border-2 border-gray-600 bg-gray-700 placeholder-gray-400 text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ease-in-out"
                    placeholder="Confirm Password"
                    value={formState.confirmPassword}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  I am a:
                </label>
                <div className="flex space-x-4">
                  {["candidate", "employer"].map((type) => (
                    <label
                      key={type}
                      className="flex items-center space-x-2 cursor-pointer"
                    >
                      <input
                        type="radio"
                        name="userType"
                        value={type}
                        checked={formState.userType === type}
                        onChange={handleChange}
                        className="form-radio h-4 w-4 text-purple-600 transition duration-150 ease-in-out"
                      />
                      <span className="text-gray-300 capitalize">{type}</span>
                    </label>
                  ))}
                </div>
              </div>
            </>
          )}
          {formState.error && (
            <p className="text-red-400 text-center text-sm">
              {formState.error}
            </p>
          )}
          {formState.success && (
            <p className="text-green-400 text-center text-sm">
              {formState.success}
            </p>
          )}
          <motion.button
            type="submit"
            disabled={formState.isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300"
          >
            {formState.isLoading ? (
              <svg
                className="animate-spin h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  strokeWidth="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : formState.isSignUp ? (
              "Create Account"
            ) : (
              "Sign In"
            )}
          </motion.button>
        </form>
        <div className="mt-4 text-center">
          <p className="text-gray-400 text-sm">
            {formState.isSignUp
              ? "Already have an account? "
              : "Don't have an account? "}
            <motion.button
              type="button"
              onClick={toggleFormMode}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="text-purple-500 hover:text-purple-400 focus:outline-none transition duration-200"
            >
              {formState.isSignUp ? "Sign In" : "Sign Up"}
            </motion.button>
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default AuthForm;
