import React, { useState } from "react";
import { FaEnvelope, FaPhone, FaMapMarkerAlt } from "react-icons/fa";
import {
  FaFacebookF,
  FaTwitter,
  FaLinkedinIn,
  FaInstagram,
} from "react-icons/fa";
import Header from "../components/Header";
import Footer from "../components/Footer";

const SocialIcon = ({ href, icon }) => (
  <a
    href={href}
    className="bg-gray-700 p-3 rounded-full text-white hover:bg-purple-500 transition duration-300"
  >
    {icon}
  </a>
);
const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form data submitted:", formData);
    alert("Thank you for your message. We will get back to you soon!");
    setFormData({ name: "", email: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gray-900 font-poppins text-white">
        <Header title="Contact Us" />
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-5xl font-extrabold mb-12 text-center">
          Get in <span className="text-purple-500">Touch</span>
        </h1>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="bg-gray-800 rounded-xl p-8 shadow-xl">
            <h2 className="text-3xl font-bold mb-6">Contact Us</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-300 mb-1"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows="4"
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-purple-600 text-white py-3 px-4 rounded-full hover:bg-purple-700 transition duration-300 font-semibold text-base transform hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
          <div className="bg-gray-800 rounded-xl p-8 shadow-xl flex flex-col justify-between">
            <div>
              <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
              <div className="space-y-4">
                <div className="flex items-center">
                  <FaEnvelope className="text-purple-500 mr-4 text-xl" />
                  <span>contact@careerlaunch.com</span>
                </div>
                <div className="flex items-center">
                  <FaPhone className="text-purple-500 mr-4 text-xl" />
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center">
                  <FaMapMarkerAlt className="text-purple-500 mr-4 text-xl" />
                  <span>123 Career Street, San Francisco, CA 94122</span>
                </div>
              </div>
            </div>
            <div className="mt-12">
              <h3 className="text-xl font-semibold mb-4">Connect with Us</h3>
              <p className="text-gray-400 mb-4">
                Follow us on social media for the latest job opportunities and
                career advice.
              </p>
              <div className="flex space-x-4">
                <SocialIcon href="#" icon={<FaFacebookF />} />
                <SocialIcon href="#" icon={<FaTwitter />} />
                <SocialIcon href="#" icon={<FaLinkedinIn />} />
                <SocialIcon href="#" icon={<FaInstagram />} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Contact;
