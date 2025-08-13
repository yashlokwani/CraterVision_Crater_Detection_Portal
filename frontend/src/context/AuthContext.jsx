import { useState, createContext, useContext, useEffect } from 'react';

// Auth context for login state management
const AuthContext = createContext();

export function useAuth() { 
  return useContext(AuthContext); 
}

export function AuthProvider({ children }) {
  const [loggedIn, setLoggedIn] = useState(false);
  
  // Check for existing token on mount
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setLoggedIn(true);
    }
  }, []);
  
  return (
    <AuthContext.Provider value={{ loggedIn, setLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
}