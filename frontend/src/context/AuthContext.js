// src/context/AuthContext.js
import React, { createContext, useState, useEffect, useContext } from 'react';

export const AuthContext = createContext();

// Create a custom hook to use the auth context
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Check if user is logged in when the component mounts
  useEffect(() => {
    // Replace this with your actual authentication logic
    const checkLoggedIn = async () => {
      try {
        // Example: Get user info from localStorage or API
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
          setUser(JSON.parse(storedUser));
        }
      } catch (error) {
        console.error("Authentication error:", error);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (credentials) => {
    // Replace with actual login logic
    // Example:
    // const response = await api.post('/login', credentials);
    // const userData = response.data;
    // setUser(userData);
    // localStorage.setItem('user', JSON.stringify(userData));
    // return userData;
    
    // Placeholder:
    const mockUser = { id: 1, name: 'Test User', email: credentials.email };
    setUser(mockUser);
    localStorage.setItem('user', JSON.stringify(mockUser));
    return mockUser;
  };

  // Logout function
  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// We still export the default context for direct usage if needed
export default AuthContext;