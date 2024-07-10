import React from 'react';

const About = () => {
  return (
    <div className="bg-gradient-to-b from-purple-100 to-white min-h-screen py-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-extrabold text-purple-800 mb-8 text-center">About Us</h1>
        
        <div className="bg-white shadow-xl rounded-lg overflow-hidden">
          <div className="p-8">
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Welcome to CareerLaunch! We are a passionate team dedicated to revolutionizing the job search and recruitment process. Our mission is to connect talented individuals with their dream careers and help employers find the perfect candidates.
            </p>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              Founded in 2024, we've rapidly grown from a small startup into a trusted platform in the job market. Our team consists of experienced professionals who are committed to innovation and excellence in the field of career development and recruitment.
            </p>
            
            <h2 className="text-2xl font-bold text-purple-700 mb-4">Our Services</h2>
            <ul className="list-disc list-inside mb-6 text-gray-700">
              <li className="mb-2">Advanced job matching algorithms</li>
              <li className="mb-2">Personalized career guidance</li>
              <li className="mb-2">Streamlined application processes</li>
              <li className="mb-2">Employer branding solutions</li>
            </ul>
            
            <p className="text-lg text-gray-700 mb-6 leading-relaxed">
              At CareerLaunch, we believe in building strong relationships with both job seekers and employers. We continuously strive to enhance our platform, ensuring an exceptional experience for all our users.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Thank you for choosing CareerLaunch. We're excited to be part of your career journey!
            </p>
          </div>
        </div>
        
        <div className="mt-12 text-center">
          <h3 className="text-2xl font-semibold text-purple-800 mb-4">Have questions or feedback?</h3>
          <button className="bg-purple-600 text-white font-bold py-3 px-6 rounded-full hover:bg-purple-700 transition duration-300 ease-in-out transform hover:scale-105">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;