import React, { useState } from 'react';

const FilterSidebar = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({
    jobType: [],
    experience: [],
    location: '',
    salary: [0, 200000],
    remote: false,
    sources: []
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFilters({
          ...filters,
          [name]: [...filters[name], value]
        });
      } else {
        setFilters({
          ...filters,
          [name]: filters[name].filter(item => item !== value)
        });
      }
    } else {
      setFilters({
        ...filters,
        [name]: value
      });
    }
  };

  const handleSubmit = () => {
    onFilterChange(filters);
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-lg font-bold mb-4">Filters</h2>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Job Type</h3>
        <div className="space-y-1">
          {['Full-time', 'Part-time', 'Contract', 'Internship'].map(type => (
            <label key={type} className="flex items-center">
              <input
                type="checkbox"
                name="jobType"
                value={type}
                checked={filters.jobType.includes(type)}
                onChange={handleChange}
                className="mr-2"
              />
              {type}
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Experience Level</h3>
        <div className="space-y-1">
          {['Entry Level', 'Mid Level', 'Senior', 'Manager'].map(exp => (
            <label key={exp} className="flex items-center">
              <input
                type="checkbox"
                name="experience"
                value={exp}
                checked={filters.experience.includes(exp)}
                onChange={handleChange}
                className="mr-2"
              />
              {exp}
            </label>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Location</h3>
        <input
          type="text"
          name="location"
          value={filters.location}
          onChange={handleChange}
          placeholder="City, State, or Remote"
          className="w-full p-2 border rounded"
        />
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Remote</h3>
        <label className="flex items-center">
          <input
            type="checkbox"
            name="remote"
            checked={filters.remote}
            onChange={(e) => setFilters({...filters, remote: e.target.checked})}
            className="mr-2"
          />
          Remote Only
        </label>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Job Sources</h3>
        <div className="space-y-1">
          {['LinkedIn', 'Indeed', 'Glassdoor', 'ZipRecruiter', 'Company Website'].map(source => (
            <label key={source} className="flex items-center">
              <input
                type="checkbox"
                name="sources"
                value={source}
                checked={filters.sources.includes(source)}
                onChange={handleChange}
                className="mr-2"
              />
              {source}
            </label>
          ))}
        </div>
      </div>
      
      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
      >
        Apply Filters
      </button>
    </div>
  );
};

export default FilterSidebar;