import React from 'react';
import { FaLightbulb, FaChartLine, FaBriefcase, FaGraduationCap } from 'react-icons/fa';
import Header from "../components/Header";
import Footer from "../components/Footer";

const CareerInsight = ({ icon, title, description }) => (
  <div className="bg-gray-800 rounded-xl p-6 shadow-xl hover:shadow-2xl transition duration-300 ease-in-out border-l-4 border-purple-500 transform hover:scale-105">
    <div className="text-purple-500 text-3xl mb-4">{icon}</div>
    <h3 className="text-xl font-semibold mb-2 text-white">{title}</h3>
    <p className="text-gray-400">{description}</p>
  </div>
);

const CareerInsights = () => {
  const insights = [
    {
      icon: <FaLightbulb />,
      title: "Emerging Industries",
      description: "Stay ahead of the curve with insights into rapidly growing sectors like AI, renewable energy, and biotechnology."
    },
    {
      icon: <FaChartLine />,
      title: "Salary Trends",
      description: "Explore current salary ranges and projections for various roles across different industries and experience levels."
    },
    {
      icon: <FaBriefcase />,
      title: "In-Demand Skills",
      description: "Discover the most sought-after skills by employers and learn how to acquire them to boost your career prospects."
    },
    {
      icon: <FaGraduationCap />,
      title: "Education Pathways",
      description: "Navigate the best educational routes to achieve your career goals, from traditional degrees to online certifications."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-900 font-poppins text-white">
      <Header title="Career Insights" />
      <div className="container mx-auto px-6 py-24">
        <h1 className="text-5xl font-extrabold mb-12 text-center">
          Career <span className="text-purple-500">Insights</span>
        </h1>

        <div className="mb-16">
          <p className="text-xl text-gray-300 mb-6 leading-relaxed text-center">
            Stay informed about the latest trends, opportunities, and strategies to advance your career. Our expert insights will help you make informed decisions and stay ahead in today's competitive job market.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {insights.map((insight, index) => (
            <CareerInsight key={index} {...insight} />
          ))}
        </div>

        <div className="bg-gray-800 rounded-xl p-8 shadow-xl mb-16">
          <h2 className="text-3xl font-bold mb-6 text-center">Latest Career Trends</h2>
          <ul className="list-disc list-inside space-y-4 text-gray-300">
            <li>Remote work continues to reshape the employment landscape</li>
            <li>Increased demand for data analysis and cybersecurity professionals</li>
            <li>Growing importance of soft skills like adaptability and emotional intelligence</li>
            <li>Rise of the gig economy and freelance opportunities</li>
            <li>Emphasis on continuous learning and upskilling</li>
          </ul>
        </div>

        <div className="text-center">
          <h3 className="text-3xl font-bold mb-6">Ready to Advance Your Career?</h3>
          <button className="bg-purple-600 text-white px-8 py-3 rounded-full hover:bg-purple-700 transition duration-300 font-semibold text-lg transform hover:scale-105">
            Explore Opportunities
          </button>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default CareerInsights;