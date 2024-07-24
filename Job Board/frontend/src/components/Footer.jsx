import React from 'react';
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaInstagram, FaChevronRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <h3 className="text-3xl font-bold text-white mb-4">CareerLaunch</h3>
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
          <FooterLinkColumn title="Quick Links" links={[
            { to: "/about", text: "About Us" },
            { to: "/jobs", text: "Explore Careers" },
            { to: "/employers", text: "For Employers" },
            { to: "/CareerInsights", text: "Career Insights" },
          ]} />
          <FooterLinkColumn title="Resources" links={[
            { to: "/privacy", text: "Privacy Policy" },
            { to: "/terms", text: "Terms of Service" },
            { to: "/faq", text: "FAQ" },
            { to: "/contact", text: "Get in Touch" },
          ]} />
          <div>
            <h4 className="text-xl font-semibold text-white mb-4">Stay Connected</h4>
            <p className="text-gray-400 mb-4">
              Get the latest opportunities and career advice
            </p>
            <form className="flex flex-col">
              <input
                type="email"
                placeholder="Enter your email"
                className="bg-gray-800 border border-gray-700 text-gray-300 px-4 py-2 rounded-t-md focus:outline-none focus:ring-2 focus:ring-gray-600 focus:border-transparent"
              />
              <button
                type="submit"
                className="bg-gray-700 text-white px-4 py-2 rounded-b-md transition duration-300 hover:bg-gray-600 flex items-center justify-center"
              >
                Subscribe <FaChevronRight className="ml-2" />
              </button>
            </form>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 text-center text-gray-500">
          <p>&copy; {new Date().getFullYear()} CareerLaunch. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

function FooterLinkColumn({ title, links }) {
  return (
    <div>
      <h4 className="text-xl font-semibold text-white mb-4">{title}</h4>
      <ul className="space-y-2">
        {links.map((link, index) => (
          <FooterLink key={index} to={link.to} text={link.text} />
        ))}
      </ul>
    </div>
  );
}

function FooterLink({ to, text }) {
  return (
    <li>
      <Link
        to={to}
        className="text-gray-400 hover:text-white transition duration-300 flex items-center group"
      >
        <FaChevronRight className="mr-2 text-gray-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        {text}
      </Link>
    </li>
  );
}

function SocialIcon({ href, icon }) {
  return (
    <a
      href={href}
      className="bg-gray-800 p-3 rounded-full text-gray-400 hover:bg-gray-700 hover:text-white transition duration-300"
    >
      {icon}
    </a>
  );
}

export default Footer;
