// AdminRoute.jsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = ({ element, ...rest }) => {
  const { user } = useAuth();
  const location = useLocation();

  if (!user || !user.admin) {
    // Redirect to home if not an admin
    return <Navigate to="/" state={{ from: location }} />;
  }

  // Render the element if admin
  return element;
};

export default AdminRoute;
