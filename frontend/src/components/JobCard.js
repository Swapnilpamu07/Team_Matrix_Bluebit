import React from 'react';
import { Link } from 'react-router-dom';

const JobCard = ({ job }) => {
  return (
    <div className="border rounded-lg p-4 mb-4 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-lg font-bold">{job.title}</h3>
          <p className="text-gray-600">{job.company}</p>
          <p className="text-gray-500">{job.location} • {job.type}</p>
        </div>
        <img 
          src={job.companyLogo || '/default-company-logo.png'} 
          alt={`${job.company} logo`}
          className="w-12 h-12 object-contain"
        />
      </div>
      
      <div className="mt-2">
        <p className="text-gray-700 line-clamp-2">{job.description}</p>
      </div>
      
      <div className="mt-3 flex items-center justify-between">
        <div className="flex flex-wrap gap-2">
          {job.tags.map((tag, index) => (
            <span key={index} className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
        <Link to={`/job/${job.id}`} className="text-blue-600 font-medium hover:underline">
          View Details
        </Link>
      </div>
      
      <div className="mt-2 text-sm text-gray-500">
        Posted {job.postedDate} • Source: {job.source}
      </div>
    </div>
  );
};

export default JobCard;