import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import jobService from '../services/jobService';

const JobDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  
  const [job, setJob] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [applyModalOpen, setApplyModalOpen] = useState(false);
  const [applicationSuccess, setApplicationSuccess] = useState(false);

  useEffect(() => {
    const fetchJobDetails = async () => {
      try {
        const jobData = await jobService.getJobById(id);
        setJob(jobData);
      } catch (err) {
        setError(err.message || 'Failed to fetch job details');
      } finally {
        setLoading(false);
      }
    };

    fetchJobDetails();
  }, [id]);

  const handleApply = async (e) => {
    e.preventDefault();
    
    if (!user) {
      navigate('/login', { state: { from: `/job/${id}` } });
      return;
    }
    
    try {
      // In a real app, you would collect application data from the form
      const applicationData = {
        userId: user.id,
        jobId: job.id,
        coverLetter: "I am interested in this position and believe my skills are a good match.",
        applicationDate: new Date().toISOString()
      };
      
      // Using applyForJob instead of applyToJob to match what's in the service
      await jobService.applyForJob(id, applicationData);
      setApplicationSuccess(true);
      setApplyModalOpen(false);
    } catch (err) {
      setError(err.message || 'Failed to submit application');
    }
  };

  if (loading) {
    return <div className="container mx-auto px-4 py-8">Loading job details...</div>;
  }

  if (error) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
          Error: {error}
        </div>
        <button 
          onClick={() => navigate(-1)} 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!job) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
          Job not found
        </div>
        <button 
          onClick={() => navigate('/')} 
          className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Back to Home
        </button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {applicationSuccess && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4">
          Your application has been submitted successfully!
        </div>
      )}
      
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-start">
            <div>
              <h1 className="text-3xl font-bold mb-2">{job.title}</h1>
              <p className="text-xl text-gray-600 mb-1">{job.company}</p>
              <p className="text-gray-600 mb-4">{job.location} • {job.type}</p>
              <p className="text-lg font-semibold mb-2">{job.salary}</p>
              <p className="text-gray-500 text-sm">Posted on: {job.postedDate}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setApplyModalOpen(true)}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded"
              >
                Apply Now
              </button>
              <button className="bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded">
                Save Job
              </button>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 px-6 py-4">
          <h2 className="text-xl font-semibold mb-3">Job Description</h2>
          <p className="mb-4">{job.description}</p>
          
          <h2 className="text-xl font-semibold mb-3">Requirements</h2>
          <p className="mb-4">{job.requirements}</p>
          
          {job.benefits && (
            <>
              <h2 className="text-xl font-semibold mb-3">Benefits</h2>
              <p className="mb-4">{job.benefits}</p>
            </>
          )}
          
          {job.applicationProcess && (
            <>
              <h2 className="text-xl font-semibold mb-3">Application Process</h2>
              <p className="mb-4">{job.applicationProcess}</p>
            </>
          )}
          
          {job.contactEmail && (
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <h3 className="font-semibold mb-2">Contact Information</h3>
              <p>Email: {job.contactEmail}</p>
            </div>
          )}
        </div>
      </div>
      
      <div className="mt-6">
        <button 
          onClick={() => navigate(-1)}
          className="text-blue-600 hover:underline"
        >
          ← Back to search results
        </button>
      </div>
      
      {/* Apply Modal */}
      {applyModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full">
            <div className="flex justify-between items-center p-4 border-b">
              <h2 className="text-xl font-semibold">Apply for {job.title}</h2>
              <button onClick={() => setApplyModalOpen(false)} className="text-gray-500 hover:text-gray-700">
                ✕
              </button>
            </div>
            
            <form onSubmit={handleApply} className="p-4">
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Cover Letter</label>
                <textarea
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                  rows="5"
                  placeholder="Why are you a good fit for this position?"
                  defaultValue="I am interested in this position and believe my skills are a good match."
                ></textarea>
              </div>
              
              <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">Resume</label>
                <input 
                  type="file" 
                  className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                />
                <p className="text-sm text-gray-500 mt-1">PDF, DOC, or DOCX files only</p>
              </div>
              
              <div className="flex justify-end space-x-2 mt-6">
                <button
                  type="button"
                  onClick={() => setApplyModalOpen(false)}
                  className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default JobDetailsPage;