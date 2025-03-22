import React from 'react';

const JobCard = ({ job }) => {
  // Add null checks and default values
  if (!job) return <div>No job data available</div>;
  
  // Extract job data with default values to prevent errors
  const { 
    title = "Unknown Title", 
    company = "Unknown Company", 
    location = "Remote",
    skills = [], // Default to empty array to prevent map errors
    // ... other job properties
  } = job;

  return (
    <div className="job-card">
      <h3>{title}</h3>
      <p>{company} - {location}</p>
      
      {/* Safely map over skills with a check */}
      {Array.isArray(skills) && skills.length > 0 ? (
        <div className="skills">
          {skills.map((skill, index) => (
            <span key={index} className="skill-tag">{skill}</span>
          ))}
        </div>
      ) : (
        <p>No skills specified</p>
      )}
      
      {/* Rest of your component */}
    </div>
  );
};

export default JobCard;