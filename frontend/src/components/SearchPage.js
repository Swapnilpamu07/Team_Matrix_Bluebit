import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import JobCard from '../components/JobCard';
import FilterSidebar from '../components/FilterSidebar';
import { useJobs } from '../hooks/useJobs';

const SearchPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [view, setView] = useState('list'); // 'list' or 'grid'
  const [sortBy, setSortBy] = useState('relevance'); // 'relevance', 'date', 'salary'
  
  // Get initial search parameters from URL
  const initialQuery = searchParams.get('q') || '';
  const initialCategory = searchParams.get('category') || '';
  const initialType = searchParams.get('type') || '';
  
  // Fetch jobs using custom hook
  const { jobs, loading, error, totalResults, fetchJobs } = useJobs({
    query: initialQuery,
    category: initialCategory,
    type: initialType
  });
  
  // Apply filters from sidebar
  const handleFilterChange = (filters) => {
    // Update search parameters based on filters
    const newParams = new URLSearchParams(searchParams);
    
    // Update or remove parameters based on filter values
    Object.entries(filters).forEach(([key, value]) => {
      if (Array.isArray(value) && value.length > 0) {
        newParams.set(key, value.join(','));
      } else if (typeof value === 'boolean' && value) {
        newParams.set(key, 'true');
      } else if (typeof value === 'string' && value) {
        newParams.set(key, value);
      } else if (Array.isArray(value) && value.length === 0) {
        newParams.delete(key);
      } else if (value === false || value === '') {
        newParams.delete(key);
      }
    });
    
    setSearchParams(newParams);
  };
  
  // Update jobs when search parameters change
  useEffect(() => {
    // Extract all filter parameters
    const query = searchParams.get('q') || '';
    const category = searchParams.get('category') || '';
    const jobType = searchParams.get('jobType')?.split(',') || [];
    const experience = searchParams.get('experience')?.split(',') || [];
    const location = searchParams.get('location') || '';
    const remote = searchParams.get('remote') === 'true';
    const sources = searchParams.get('sources')?.split(',') || [];
    
    // Fetch jobs with updated filters
    fetchJobs({
      query,
      category,
      jobType,
      experience,
      location,
      remote,
      sources,
      sortBy
    });
  }, [searchParams, sortBy, fetchJobs]);
  
  // Handle sort change
  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };
  
  return (
    <div className="container mx-auto px-4 py-6">
      <div className="mb-6">
        <h1 className="text-2xl font-bold mb-2">
          {initialQuery 
            ? `Search results for "${initialQuery}"` 
            : initialCategory 
              ? `${initialCategory} Jobs` 
              : initialType === 'internship' 
                ? 'Internship Opportunities' 
                : 'All Jobs'}
        </h1>
        {!loading && <p className="text-gray-600">{totalResults} results found</p>}
      </div>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Sidebar */}
        <div className="w-full md:w-1/4">
          <FilterSidebar onFilterChange={handleFilterChange} />
        </div>
        
        {/* Main content */}
        <div className="w-full md:w-3/4">
          {/* Control bar */}
          <div className="bg-white p-4 rounded-lg shadow mb-4 flex flex-col sm:flex-row justify-between items-center">
            <div className="flex items-center mb-4 sm:mb-0">
              <span className="mr-2">Sort by:</span>
              <select 
                value={sortBy} 
                onChange={handleSortChange}
                className="border rounded p-2"
              >
                <option value="relevance">Relevance</option>
                <option value="date">Most Recent</option>
                <option value="salary">Salary (High to Low)</option>
              </select>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => setView('list')}
                className={`p-2 rounded ${view === 'list' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              >
                List View
              </button>
              <button 
                onClick={() => setView('grid')}
                className={`p-2 rounded ${view === 'grid' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100'}`}
              >
                Grid View
              </button>
            </div>
          </div>
          
          {/* Results */}
          {loading ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
              <p>Loading jobs...</p>
            </div>
          ) : error ? (
            <div className="bg-white rounded-lg shadow p-8 text-center text-red-500">
              <p>Error loading jobs. Please try again later.</p>
            </div>
          ) : jobs.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <p className="text-lg mb-4">No job listings found.</p>
              <p className="text-gray-600">Try adjusting your search criteria or filters.</p>
            </div>
          ) : (
            <div className={view === 'grid' 
              ? "grid grid-cols-1 sm:grid-cols-2 gap-4" 
              : "space-y-4"
            }>
              {jobs.map(job => (
                <JobCard key={job.id} job={job} />
              ))}
            </div>
          )}
          
          {/* Pagination */}
          {!loading && jobs.length > 0 && (
            <div className="mt-8 flex justify-center">
              <nav className="flex items-center space-x-2">
                <button className="px-4 py-2 rounded border bg-white">Previous</button>
                <button className="px-4 py-2 rounded bg-blue-600 text-white">1</button>
                <button className="px-4 py-2 rounded border bg-white">2</button>
                <button className="px-4 py-2 rounded border bg-white">3</button>
                <span className="px-2">...</span>
                <button className="px-4 py-2 rounded border bg-white">Next</button>
              </nav>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchPage;