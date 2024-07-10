import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="mb-8 md:mb-0">
            <h3 className="text-2xl font-bold mb-6 text-purple-500">CareerLaunch</h3>
            <p className="text-gray-400 mb-6">
              Propelling your career journey with opportunities that ignite your potential.
            </p>
            <div className="flex space-x-4">
              <SocialIcon href="#" icon={<FaFacebookF />} />
              <SocialIcon href="#" icon={<FaTwitter />} />
              <SocialIcon href="#" icon={<FaLinkedinIn />} />
              <SocialIcon href="#" icon={<FaInstagram />} />
            </div>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-purple-400">Quick Links</h4>
            <ul className="space-y-3">
              <FooterLink to="/about" text="About Us" />
              <FooterLink to="/jobs" text="Explore Careers" />
              <FooterLink to="/employers" text="For Employers" />
              <FooterLink to="/CareerInsights" text="Career Insights" />
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-purple-400">Resources</h4>
            <ul className="space-y-3">
              <FooterLink to="/privacy" text="Privacy Policy" />
              <FooterLink to="/terms" text="Terms of Service" />
              <FooterLink to="/faq" text="FAQ" />
              <FooterLink to="/contact" text="Get in Touch" />
            </ul>
          </div>
          <div>
            <h4 className="text-lg font-semibold mb-6 text-purple-400">Stay Connected</h4>
            <p className="text-gray-400 mb-4">
              Get the latest opportunities and career advice
            </p>
            <form className="flex flex-col sm:flex-row">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 text-white px-4 py-2 rounded-t-md sm:rounded-l-md sm:rounded-r-none focus:outline-none focus:ring-2 focus:ring-purple-500 flex-grow mb-2 sm:mb-0"
              />
              <button
                type="submit"
                className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-b-md sm:rounded-r-md sm:rounded-l-none transition duration-300"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t border-gray-800 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} CareerLaunch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({ to, text }) {
  return (
    <li>
      <Link to={to} className="text-gray-400 hover:text-purple-400 transition duration-300">
        {text}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a href={href} className="text-gray-500 hover:text-purple-400 transition duration-300">
      {icon}
    </a>
  );
}

export default Footer;