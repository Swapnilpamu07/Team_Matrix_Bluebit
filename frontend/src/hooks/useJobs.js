import { useState, useEffect } from 'react';

// Sample job data
const MOCK_JOBS = [
  {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'We are looking for a Frontend Developer to join our team.',
    requirements: 'React, JavaScript, HTML, CSS',
    salary: '$80,000 - $100,000',
    postedDate: '2025-03-01'
  },
  {
    id: 2,
    title: 'Backend Developer',
    company: 'DataSystems',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Backend developer position working with Node.js and databases.',
    requirements: 'Node.js, Express, MongoDB, SQL',
    salary: '$90,000 - $110,000',
    postedDate: '2025-03-05'
  },
  {
    id: 3,
    title: 'UI/UX Designer',
    company: 'CreativeLabs',
    location: 'Remote',
    type: 'Contract',
    description: 'Design user-friendly interfaces for web and mobile applications.',
    requirements: 'Figma, Adobe XD, UI/UX principles',
    salary: '$70,000 - $85,000',
    postedDate: '2025-03-10'
  },
  {
    id: 4,
    title: 'DevOps Engineer',
    company: 'CloudTech',
    location: 'Seattle, WA',
    type: 'Full-time',
    description: 'Implementing CI/CD pipelines and managing cloud infrastructure.',
    requirements: 'AWS, Docker, Kubernetes, Jenkins',
    salary: '$100,000 - $130,000',
    postedDate: '2025-03-12'
  }
];

export const useJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all jobs
  const fetchJobs = async () => {
    setLoading(true);
    try {
      // In a real application, replace this with an actual API call
      // Example:
      // const response = await fetch('/api/jobs');
      // const data = await response.json();
      
      // Using mock data for now
      setJobs(MOCK_JOBS);
      setError(null);
    } catch (error) {
      setError(error.message || 'Failed to fetch jobs');
      console.error('Error fetching jobs:', error);
    } finally {
      setLoading(false);
    }
  };

  // Get a specific job by ID
  const getJobById = (id) => {
    return jobs.find(job => job.id === parseInt(id));
  };

  // Search jobs by title, company, location, etc.
  const searchJobs = (query) => {
    if (!query) return jobs;
    
    const lowercaseQuery = query.toLowerCase();
    return jobs.filter(job => 
      job.title.toLowerCase().includes(lowercaseQuery) ||
      job.company.toLowerCase().includes(lowercaseQuery) ||
      job.location.toLowerCase().includes(lowercaseQuery) ||
      job.description.toLowerCase().includes(lowercaseQuery)
    );
  };

  // Load jobs on initial render
  useEffect(() => {
    fetchJobs();
  }, []);

  return {
    jobs,
    loading,
    error,
    fetchJobs,
    getJobById,
    searchJobs
  };
};

export default useJobs;