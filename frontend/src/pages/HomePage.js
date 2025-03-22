import React from 'react';
import { Link } from 'react-router-dom';
import JobCard from '../components/JobCard';
import { useJobs } from '../hooks/useJobs';

const HomePage = () => {
  const { jobs, loading, error } = useJobs({ limit: 5 });
  
  return (
    <div className="container mx-auto px-4 py-8">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-xl p-8 mb-12">
        <div className="max-w-2xl">
          <h1 className="text-4xl font-bold mb-4">Find Your Dream Job Or Internship</h1>
          <p className="text-xl mb-6">
            The ultimate job aggregator that brings opportunities from all major platforms into one place
          </p>
          <div className="flex space-x-4">
            <Link 
              to="/search" 
              className="bg-white text-blue-700 px-6 py-3 rounded-lg font-medium hover:bg-blue-50"
            >
              Search Jobs
            </Link>
            <Link 
              to="/search?type=internship" 
              className="bg-transparent border-2 border-white text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
            >
              Find Internships
            </Link>
          </div>
        </div>
      </section>
      
      {/* Statistics Section */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-3xl font-bold text-blue-600 mb-2">10,000+</h3>
          <p className="text-gray-600">Active Job Listings</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-3xl font-bold text-blue-600 mb-2">25+</h3>
          <p className="text-gray-600">Job Platforms Integrated</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-3xl font-bold text-blue-600 mb-2">2,500+</h3>
          <p className="text-gray-600">Companies Hiring</p>
        </div>
      </section>
      
      {/* Featured Jobs Section */}
      <section className="mb-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold">Featured Opportunities</h2>
          <Link to="/search" className="text-blue-600 hover:underline">View All</Link>
        </div>
        
        {loading ? (
          <div className="text-center py-8">Loading featured jobs...</div>
        ) : error ? (
          <div className="text-center py-8 text-red-500">
            Unable to load jobs. Please try again later.
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4">
            {jobs.map(job => (
              <JobCard key={job.id} job={job} />
            ))}
          </div>
        )}
      </section>
      
      {/* Categories Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Browse By Category</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { name: 'Software Development', icon: '💻' },
            { name: 'Data Science', icon: '📊' },
            { name: 'Marketing', icon: '📢' },
            { name: 'Design', icon: '🎨' },
            { name: 'Finance', icon: '💰' },
            { name: 'Healthcare', icon: '🏥' },
            { name: 'Education', icon: '🎓' },
            { name: 'Remote Work', icon: '🏠' }
          ].map(category => (
            <Link 
              key={category.name}
              to={`/search?category=${encodeURIComponent(category.name)}`}
              className="bg-white p-4 rounded-lg shadow text-center hover:shadow-md transition-shadow"
            >
              <div className="text-3xl mb-2">{category.icon}</div>
              <div className="font-medium">{category.name}</div>
            </Link>
          ))}
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-center">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">1</div>
            <h3 className="text-xl font-medium mb-2">Search Across Platforms</h3>
            <p className="text-gray-600">Find opportunities from LinkedIn, Indeed, Glassdoor, and more in one search.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">2</div>
            <h3 className="text-xl font-medium mb-2">Filter & Compare</h3>
            <p className="text-gray-600">Use our powerful filters to narrow down and compare opportunities.</p>
          </div>
          <div className="text-center">
            <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4 text-xl font-bold">3</div>
            <h3 className="text-xl font-medium mb-2">Apply Directly</h3>
            <p className="text-gray-600">Apply to jobs with a single click or save them for later.</p>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="bg-gray-100 rounded-xl p-8 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Discover Your Next Opportunity?</h2>
        <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
          Join thousands of job seekers who have simplified their job search with our platform.
        </p>
        <Link 
          to="/signup" 
          className="bg-blue-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-blue-700"
        >
          Create Free Account
        </Link>
      </section>
    </div>
  );
};

export default HomePage;