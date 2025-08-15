import { useState, createContext, useContext, useEffect } from 'react';
import api from '../api';

// Auth context for login state management
const AuthContext = createContext();

export function useAuth() { 
  return useContext(AuthContext); 
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  
  // Function to validate token and restore auth state
  const validateToken = async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
      setLoggedIn(false);
      setUser(null);
      setLoading(false);
      return;
    }

    try {
      // Set the token in axios headers
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      
      // Try to make a request to validate the token
      // You can create a simple /api/auth/me endpoint or use any protected endpoint
      const response = await api.get('/api/auth/me');
      
      if (response.data.user) {
        setLoggedIn(true);
        setUser(response.data.user);
        console.log('🔐 Token validated successfully, user logged in');
      } else {
        throw new Error('Invalid response');
      }
    } catch (error) {
      console.log('❌ Token validation failed:', error.message);
      // Token is invalid, clear it
      localStorage.removeItem('token');
      delete api.defaults.headers.common['Authorization'];
      setLoggedIn(false);
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  // Function to login user
  const login = (token, userData) => {
    localStorage.setItem('token', token);
    api.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    setLoggedIn(true);
    setUser(userData);
    console.log('✅ User logged in successfully');
  };

  // Function to logout user
  const logout = () => {
    localStorage.removeItem('token');
    delete api.defaults.headers.common['Authorization'];
    setLoggedIn(false);
    setUser(null);
    console.log('👋 User logged out');
  };
  
  useEffect(() => {
    validateToken();
  }, []);
  
  return (
    <AuthContext.Provider value={{ 
      loggedIn, 
      setLoggedIn, 
      user, 
      setUser, 
      loading, 
      login, 
      logout, 
      validateToken 
    }}>
      {children}
    </AuthContext.Provider>
  );
}