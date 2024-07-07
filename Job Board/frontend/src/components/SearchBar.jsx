import React, { useState } from 'react';

function SearchBar() {
  const [formData, setFormData] = useState({
    keyword: '',
    location: '',
    category: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Searching for:', formData);
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-4xl mx-auto shadow-lg p-4 rounded-lg">
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
        <InputField
          name="keyword"
          placeholder="Job title or keyword"
          value={formData.keyword}
          onChange={handleChange}
        />
        <InputField
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
        />
        <SelectField
          name="category"
          value={formData.category}
          onChange={handleChange}
          options={[
            { value: '', text: 'All Categories' },
            { value: 'technology', text: 'Technology' },
            { value: 'marketing', text: 'Marketing' },
            { value: 'finance', text: 'Finance' },
          ]}
        />
        <button
          type="submit"
          className="px-6 py-3 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-lg hover:from-blue-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out"
        >
          Search
        </button>
      </div>
    </form>
  );
}

function InputField({ name, placeholder, value, onChange }) {
  return (
    <input
      type="text"
      name={name}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      aria-label={placeholder}
      className="flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
      style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', color: 'black', backgroundColor: 'white' }}
    />
  );
}

function SelectField({ name, value, onChange, options }) {
  return (
    <select
      name={name}
      value={value}
      onChange={onChange}
      aria-label={name}
      className="flex-grow px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-200 ease-in-out transform hover:scale-105"
      style={{ boxShadow: '0 2px 6px rgba(0, 0, 0, 0.1)', color: 'black', backgroundColor: 'white' }}
    >
      {options.map(option => (
        <option key={option.value} value={option.value}>{option.text}</option>
      ))}
    </select>
  );
}

export default SearchBar;