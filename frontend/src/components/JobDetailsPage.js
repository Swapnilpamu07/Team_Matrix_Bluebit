import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getJobById, saveJob, applyToJob } from '../services/jobService';

const JobDetailsPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSaved, setIsSaved] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  
  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        setLoading(true);
        const jobData = await getJobById(id);
        setJob(jobData);
        
        // Check if job is saved by user
        if (user) {
          setIsSaved(user.savedJobs?.includes(id) || false);
        }
      } catch (err) {
        setError('Failed to load job details. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchJobDetails();
  }, [id, user]);
  
  const handleSaveJob = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    try {
      await saveJob(id);
      setIsSaved(!isSaved);
    } catch (err) {
      console.error('Error saving job:', err);
    }
  };
  
  const handleApply = async () => {
    if (!user) {
      setShowLoginModal(true);
      return;
    }
    
    try {
      // Redirect to external job URL or handle application
      window.open(job.applicationUrl, '_blank');
      
      // Track application in our system
      await applyToJob(id);
    } catch (err) {
      console.error('Error applying to job:', err);
    }
  };
  
  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Loading job details...</p>
      </div>
    );
  }
  
  if (error || !job) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="bg-red-50 text-red-600 p-4 rounded-lg">
          <p>{error || 'Job not found'}</p>
        </div>
        <Link to="/search" className="mt-4 inline-block text-blue-600 hover:underline">
          Back to Search
        </Link>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Company Header */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center">
          <img 
            src={job.companyLogo || '/default-company-logo.png'} 
            alt={`${job.company} logo`}
            className="w-16 h-16 object-contain mr-6 mb-4 md:mb-0"
          />
          <div className="flex-1">
            <h1 className="text-2xl font-bold mb-1">{job.title}</h1>
            <div className="flex flex-wrap items-center text-gray-600 mb-2">
              <span className="font-medium mr-2">{job.company}</span>
              <span className="mr-2">•</span>
              <span className="mr-2">{job.location}</span>
              {job.remote && (
                <>
                  <span className="mr-2">•</span>
                  <span className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded">Remote</span>
                </>
              )}
            </div>
            <div className="text-gray-500 text-sm">
              Posted {job.postedDate} • Source: {job.source}
            </div>
          </div>
          <div className="mt-4 md:mt-0 flex flex-col sm:flex-row gap-3">
            <button 
              onClick={handleSaveJob}
              className={`flex items-center px-4 py-2 rounded border ${
                isSaved 
                  ? 'bg-blue-50 text-blue-600 border-blue-200' 
                  : 'bg-white border-gray-300 hover:bg-gray-50'
              }`}
            >
              <span className="mr-2">{isSaved ? '★' : '☆'}</span>
              {isSaved ? 'Saved' : 'Save Job'}
            </button>
            <button 
              onClick={handleApply}
              className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
            >
              Apply Now
            </button>
          </div>
        </div>
      </div>
      
      {/* Job Details */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          {/* Job Summary */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Job Summary</h2>
            <div className="space-y-4">
              <p>{job.description}</p>
            </div>
          </div>
          
          {/* Job Description */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Job Description</h2>
            <div className="space-y-4 job-description" dangerouslySetInnerHTML={{ __html: job.fullDescription }} />
          </div>
          
          {/* Requirements */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Requirements</h2>
            <ul className="list-disc pl-5 space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index}>{req}</li>
              ))}
            </ul>
          </div>
          
          {/* Benefits */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">Benefits</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {job.benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="text-green-500 mr-2">✓</div>
                  <div>{benefit}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Application CTA */}
          <div className="bg-blue-50 rounded-lg p-6 mb-6 text-center">
            <h2 className="text-xl font-bold mb-2">Interested in this position?</h2>
            <p className="mb-4">Apply now and take the next step in your career journey.</p>
            <button 
              onClick={handleApply}
              className="bg-blue-600 text-white px-8 py-3 rounded-lg hover:bg-blue-700"
            >
              Apply for this Job
            </button>
          </div>
          
          {/* Similar Jobs */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-xl font-bold mb-4">Similar Jobs</h2>
            <div className="space-y-4">
              {job.similarJobs && job.similarJobs.length > 0 ? (
                job.similarJobs.map((similarJob) => (
                  <div key={similarJob.id} className="border-b pb-4 last:border-0">
                    <h3 className="font-medium mb-1">
                      <Link to={`/job/${similarJob.id}`} className="text-blue-600 hover:underline">
                        {similarJob.title}
                      </Link>
                    </h3>
                    <div className="text-sm text-gray-600">
                      {similarJob.company} • {similarJob.location}
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">No similar jobs found.</p>
              )}
            </div>
          </div>
        </div>
        
        {/* Sidebar */}
        <div className="md:col-span-1">
          {/* Job Details Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">Job Details</h2>
            <div className="space-y-4">
              <div>
                <div className="text-gray-600 mb-1">Job Type</div>
                <div className="font-medium">{job.type}</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Experience Level</div>
                <div className="font-medium">{job.experienceLevel}</div>
              </div>
              {job.salary && (
                <div>
                  <div className="text-gray-600 mb-1">Salary Range</div>
                  <div className="font-medium">{job.salary}</div>
                </div>
              )}
              <div>
                <div className="text-gray-600 mb-1">Location</div>
                <div className="font-medium">{job.location}</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Original Posting</div>
                <a 
                  href={job.originalUrl} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline"
                >
                  View on {job.source}
                </a>
              </div>
            </div>
          </div>
          
          {/* Company Info Card */}
          <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
            <h2 className="text-lg font-bold mb-4">About {job.company}</h2>
            <div className="space-y-4">
              <p className="text-gray-700">{job.companyDescription || 'No company description available.'}</p>
              <div>
                <div className="text-gray-600 mb-1">Industry</div>
                <div className="font-medium">{job.industry || 'Not specified'}</div>
              </div>
              <div>
                <div className="text-gray-600 mb-1">Company Size</div>
                <div className="font-medium">{job.companySize || 'Not specified'}</div>
              </div>
              {job.companyWebsite && (
                <a 
                  href={job.companyWebsite} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="block text-blue-600 hover:underline"
                >
                  Visit Company Website
                </a>
              )}
            </div>
          </div>
          
          {/* Skills Card */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-bold mb-4">Skills</h2>
            <div className="flex flex-wrap gap-2">
              {job.skills && job.skills.length > 0 ? (
                job.skills.map((skill, index) => (
                  <span key={index} className="bg-gray-100 text-gray-800 px-3 py-1 rounded-full text-sm">
                    {skill}
                  </span>
                ))
              ) : (
                <p className="text-gray-500">No specific skills listed.</p>
              )}
            </div>
          </div>
        </div>
      </div>
      
      {/* Login Modal */}
      {showLoginModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full">
            <h2 className="text-xl font-bold mb-4">Login Required</h2>
            <p className="mb-4">Please login or sign up to save jobs and apply.</p>
            <div className="flex justify-end space-x-3">
              <button 
                onClick={() => setShowLoginModal(false)}
                className="px-4 py-2 border rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <Link 
                to="/login" 
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
              >
                Login
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;