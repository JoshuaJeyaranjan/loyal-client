// AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { decodeJwt } from './utils/jwtUtils';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      const decoded = decodeJwt(token);
      setUser(decoded);
    }
  }, []);

  const login = (token) => {
    console.log('Token during login:', token);
    localStorage.setItem('authToken', token);
    const decoded = decodeJwt(token);
    console.log('Decoded user during login:', decoded); // Log decoded user
    setUser(decoded);
  };
  

  const logout = () => {
    localStorage.removeItem('authToken');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
