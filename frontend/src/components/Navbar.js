import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const handleSearch = (e) => {
    e.preventDefault();
    navigate(`/search?q=${searchQuery}`);
  };

  return (
    <nav className="bg-blue-600 text-white p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-bold">JobHub</Link>
        
        <form onSubmit={handleSearch} className="flex-1 mx-4">
          <input
            type="text"
            placeholder="Search jobs or internships..."
            className="p-2 rounded w-full max-w-md text-black"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </form>
        
        <div className="flex items-center space-x-4">
          <Link to="/search" className="hover:text-blue-200">Browse</Link>
          {user ? (
            <>
              <Link to="/dashboard" className="hover:text-blue-200">Dashboard</Link>
              <button onClick={logout} className="hover:text-blue-200">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-blue-200">Login</Link>
              <Link to="/signup" className="bg-white text-blue-600 px-4 py-2 rounded">Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;