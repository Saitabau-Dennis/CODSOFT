import React from 'react';
import { FaRocket, FaUsers, FaChartLine, FaLightbulb } from 'react-icons/fa';
import Header from "../components/Header";
import Footer from "../components/Footer";

const About = () => {
  const services = [
    { icon: <FaRocket />, title: "Advanced Job Matching", description: "Our AI-powered algorithms connect you with the perfect opportunities." },
    { icon: <FaUsers />, title: "Personalized Guidance", description: "Expert career advice tailored to your unique professional journey." },
    { icon: <FaChartLine />, title: "Streamlined Applications", description: "Effortless application process to save you time and energy." },
    { icon: <FaLightbulb />, title: "Employer Branding", description: "Innovative solutions to showcase your company culture and attract top talent." },
  ];

  return (
    <div className="min-h-screen bg-gray-900 font-poppins text-white">
       <Header title="About Us" />
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-5xl font-extrabold mb-12 text-center">
          About <span className="text-purple-500">CareerLaunch</span>
        </h1>
        
        <div className="bg-gray-800 rounded-xl p-8 shadow-xl mb-16">
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            Welcome to CareerLaunch! We are a passionate team dedicated to revolutionizing the job search and recruitment process. Our mission is to connect talented individuals with their dream careers and help employers find the perfect candidates.
          </p>
          
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            Founded in 2024, we've rapidly grown from a small startup into a trusted platform in the job market. Our team consists of experienced professionals who are committed to innovation and excellence in the field of career development and recruitment.
          </p>
        </div>
        
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {services.map((service, index) => (
            <div key={index} className="bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out border-l-4 border-purple-500 transform hover:scale-105">
              <div className="text-purple-500 text-4xl mb-4">{service.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-400">{service.description}</p>
            </div>
          ))}
        </div>
        
        <div className="bg-gray-800 rounded-xl p-8 shadow-xl mb-16">
          <p className="text-xl text-gray-300 mb-6 leading-relaxed">
            At CareerLaunch, we believe in building strong relationships with both job seekers and employers. We continuously strive to enhance our platform, ensuring an exceptional experience for all our users.
          </p>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            Thank you for choosing CareerLaunch. We're excited to be part of your career journey!
          </p>
        </div>
        
        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Launch Your Career?</h3>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300 font-semibold text-lg transform hover:scale-105">
            Get Started Now
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default About;