import React, { useState, useEffect } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { getUserSavedJobs, getUserApplications, removeJob } from '../services/userService';
import JobCard from '../components/JobCard';

const DashboardPage = () => {
  const { user, isAuthenticated, loading: authLoading } = useAuth();
  const [activeTab, setActiveTab] = useState('saved');
  const [savedJobs, setSavedJobs] = useState([]);
  const [applications, setApplications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    const fetchUserData = async () => {
      if (!isAuthenticated) return;
      
      try {
        setLoading(true);
        
        if (activeTab === 'saved') {
          const savedJobsData = await getUserSavedJobs();
          setSavedJobs(savedJobsData);
        } else if (activeTab === 'applications') {
          const applicationsData = await getUserApplications();
          setApplications(applicationsData);
        }
      } catch (err) {
        setError('Failed to load your data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    if (!authLoading) {
      fetchUserData();
    }
  }, [isAuthenticated, authLoading, activeTab]);
  
  const handleRemoveSavedJob = async (jobId) => {
    try {
      await removeJob(jobId);
      setSavedJobs(savedJobs.filter(job => job.id !== jobId));
    } catch (err) {
      console.error('Error removing job:', err);
    }
  };
  
  // If user is not authenticated, redirect to login
  if (!authLoading && !isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  if (authLoading) {
    return (
      <div className="container mx-auto px-4 py-8 text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white rounded-lg shadow-sm p-6 mb-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">My Dashboard</h1>
            <p className="text-gray-600">Welcome back, {user.name}!</p>
          </div>
          <Link 
            to="/search" 
            className="mt-4 md:mt-0 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            Find New Opportunities
          </Link>
        </div>
        
        {/* Dashboard Tabs */}
        <div className="border-b mb-6">
          <nav className="flex space-x-8">
            <button
              onClick={() => setActiveTab('saved')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'saved'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Saved Jobs
            </button>
            <button
              onClick={() => setActiveTab('applications')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'applications'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              My Applications
            </button>
            <button
              onClick={() => setActiveTab('profile')}
              className={`py-4 px-1 border-b-2 font-medium text-sm ${
                activeTab === 'profile'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
              }`}
            >
              Profile
            </button>
          </nav>
        </div>
        
        {/* Tab Content */}
        {loading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
            <p>Loading your data...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">
            <p>{error}</p>
          </div>
        ) : (
          <div>
            {/* Saved Jobs Tab */}
            {activeTab === 'saved' && (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  Saved Jobs ({savedJobs.length})
                </h2>
                
                {savedJobs.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4">You haven't saved any jobs yet.</p>
                    <Link
                      to="/search"
                      className="text-blue-600 hover:underline"
                    >
                      Start exploring jobs
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {savedJobs.map(job => (
                      <div key={job.id} className="relative">
                        <button
                          onClick={() => handleRemoveSavedJob(job.id)}
                          className="absolute top-4 right-4 bg-red-100 text-red-600 p-1 rounded-full hover:bg-red-200"
                          title="Remove from saved"
                        >
                          ✕
                        </button>
                        <JobCard job={job} />
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <div>
                <h2 className="text-xl font-bold mb-4">
                  My Applications ({applications.length})
                </h2>
                
                {applications.length === 0 ? (
                  <div className="text-center py-8 bg-gray-50 rounded-lg">
                    <p className="text-gray-600 mb-4">You haven't applied to any jobs yet.</p>
                    <Link
                      to="/search"
                      className="text-blue-600 hover:underline"
                    >
                      Find jobs to apply
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {applications.map(application => (
                      <div key={application.id} className="border rounded-lg p-4 shadow-sm">
                        <div className="flex flex-col md:flex-row justify-between mb-2">
                          <div>
                            <Link to={`/job/${application.job.id}`} className="text-lg font-bold text-blue-600 hover:underline">
                              {application.job.title}
                            </Link>
                            <p className="text-gray-600">{application.job.company}</p>
                          </div>
                          <div className="text-gray-500 text-sm mt-2 md:mt-0">
                            Applied on {new Date(application.appliedDate).toLocaleDateString()}
                          </div>
                        </div>
                        <div className="flex items-center justify-between mt-4">
                          <div className={`px-3 py-1 rounded-full text-sm ${
                            application.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                            application.status === 'viewed' ? 'bg-blue-100 text-blue-800' :
                            application.status === 'interviewing' ? 'bg-purple-100 text-purple-800' :
                            application.status === 'offered' ? 'bg-green-100 text-green-800' :
                            application.status === 'rejected' ? 'bg-red-100 text-red-800' :
                            'bg-gray-100 text-gray-800'
                          }`}>
                            {application.status.charAt(0).toUpperCase() + application.status.slice(1)}
                          </div>
                          <a 
                            href={application.job.applicationUrl} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className="text-blue-600 hover:underline text-sm"
                          >
                            View Original Posting
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <div>
                <h2 className="text-xl font-bold mb-6">Your Profile</h2>
                
                <div className="bg-gray-50 rounded-lg p-6 mb-6">
                  <div className="flex flex-col md:flex-row items-start">
                    <div className="bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold mb-4 md:mb-0 md:mr-6">
                      {user.name.charAt(0)}
                    </div>
                    <div>
                      <h3 className="text-lg font-bold">{user.name}</h3>
                      <p className="text-gray-600">{user.email}</p>
                      <p className="text-gray-500 text-sm mt-1">Member since {new Date(user.createdAt).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Profile Information */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-bold mb-4">Personal Information</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Full Name</label>
                        <input
                          type="text"
                          value={user.name}
                          className="w-full p-2 border rounded bg-gray-50"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Email</label>
                        <input
                          type="email"
                          value={user.email}
                          className="w-full p-2 border rounded bg-gray-50"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Phone</label>
                        <input
                          type="tel"
                          value={user.phone || 'Not provided'}
                          className="w-full p-2 border rounded bg-gray-50"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Location</label>
                        <input
                          type="text"
                          value={user.location || 'Not provided'}
                          className="w-full p-2 border rounded bg-gray-50"
                          readOnly
                        />
                      </div>
                    </div>
                    <button className="mt-6 text-blue-600 hover:underline">
                      Edit Profile
                    </button>
                  </div>
                  
                  {/* Preferences */}
                  <div className="bg-white rounded-lg shadow-sm p-6">
                    <h3 className="text-lg font-bold mb-4">Job Preferences</h3>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Job Types</label>
                        <div className="p-2 border rounded bg-gray-50 min-h-10">
                          {user.preferences?.jobTypes?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {user.preferences.jobTypes.map((type, index) => (
                                <span key={index} className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded">
                                  {type}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500">No preferences set</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Desired Salary</label>
                        <input
                          type="text"
                          value={user.preferences?.salary || 'Not specified'}
                          className="w-full p-2 border rounded bg-gray-50"
                          readOnly
                        />
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Preferred Locations</label>
                        <div className="p-2 border rounded bg-gray-50 min-h-10">
                          {user.preferences?.locations?.length > 0 ? (
                            <div className="flex flex-wrap gap-2">
                              {user.preferences.locations.map((location, index) => (
                                <span key={index} className="bg-blue-100 text-blue-700 text-sm px-2 py-1 rounded">
                                  {location}
                                </span>
                              ))}
                            </div>
                          ) : (
                            <span className="text-gray-500">No preferences set</span>
                          )}
                        </div>
                      </div>
                      <div>
                        <label className="block text-gray-600 text-sm mb-1">Remote Preference</label>
                        <input
                          type="text"
                          value={user.preferences?.remote ? 'Remote Only' : user.preferences?.hybrid ? 'Hybrid' : 'Not specified'}
                          className="w-full p-2 border rounded bg-gray-50"
                          readOnly
                        />
                      </div>
                    </div>
                    <button className="mt-6 text-blue-600 hover:underline">
                      Update Preferences
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DashboardPage;