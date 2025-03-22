// API base URL
const BASE_URL = '/api';  // Replace with your actual API base URL

// Mock user token for authenticated requests
const getToken = () => {
  const user = JSON.parse(localStorage.getItem('user'));
  return user?.token;
};

// Helper for making authenticated requests
const authFetch = async (endpoint, options = {}) => {
  const token = getToken();
  
  if (token) {
    options.headers = {
      ...options.headers,
      Authorization: `Bearer ${token}`
    };
  }
  
  const response = await fetch(`${BASE_URL}${endpoint}`, options);
  
  if (!response.ok) {
    const error = await response.json();
    throw new Error(error.message || 'Something went wrong');
  }
  
  return response.json();
};

// For development/testing without backend
const mockJobData = {
  1: {
    id: 1,
    title: 'Frontend Developer',
    company: 'TechCorp',
    location: 'New York, NY',
    type: 'Full-time',
    description: 'We are looking for a Frontend Developer to join our team.',
    requirements: 'React, JavaScript, HTML, CSS',
    salary: '$80,000 - $100,000',
    postedDate: '2025-03-01',
    applicationProcess: 'Apply through our website or send your resume.',
    benefits: 'Health insurance, 401k, flexible work schedule',
    contactEmail: 'careers@techcorp.com'
  },
  2: {
    id: 2,
    title: 'Backend Developer',
    company: 'DataSystems',
    location: 'San Francisco, CA',
    type: 'Full-time',
    description: 'Backend developer position working with Node.js and databases.',
    requirements: 'Node.js, Express, MongoDB, SQL',
    salary: '$90,000 - $110,000',
    postedDate: '2025-03-05',
    applicationProcess: 'Send your resume to our HR department.',
    benefits: 'Health and dental insurance, stock options',
    contactEmail: 'hr@datasystems.com'
  }
};

// Job Service API
const jobService = {
  // Get all jobs
  getAllJobs: async () => {
    try {
      // Uncomment for real API call
      // return await authFetch('/jobs');
      
      // Mock implementation
      return Object.values(mockJobData);
    } catch (error) {
      console.error('Error fetching jobs:', error);
      throw error;
    }
  },
  
  // Get job by ID
  getJobById: async (id) => {
    try {
      // Uncomment for real API call
      // return await authFetch(`/jobs/${id}`);
      
      // Mock implementation
      if (mockJobData[id]) {
        return mockJobData[id];
      }
      throw new Error('Job not found');
    } catch (error) {
      console.error(`Error fetching job with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Apply for a job
  applyForJob: async (jobId, applicationData) => {
    try {
      // Uncomment for real API call
      // return await authFetch(`/jobs/${jobId}/apply`, {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json' },
      //   body: JSON.stringify(applicationData)
      // });
      
      // Mock implementation
      if (!mockJobData[jobId]) {
        throw new Error('Job not found');
      }
      
      return {
        success: true,
        message: 'Application submitted successfully',
        applicationId: Date.now(),
        jobId: jobId
      };
    } catch (error) {
      console.error('Error applying for job:', error);
      throw error;
    }
  },
  
  // Search for jobs
  searchJobs: async (query) => {
    try {
      // Uncomment for real API call
      // return await authFetch(`/jobs/search?q=${encodeURIComponent(query)}`);
      
      // Mock implementation
      const lowercaseQuery = query.toLowerCase();
      return Object.values(mockJobData).filter(job => 
        job.title.toLowerCase().includes(lowercaseQuery) ||
        job.company.toLowerCase().includes(lowercaseQuery) ||
        job.location.toLowerCase().includes(lowercaseQuery) ||
        job.description.toLowerCase().includes(lowercaseQuery)
      );
    } catch (error) {
      console.error('Error searching jobs:', error);
      throw error;
    }
  }
};

export default jobService;