import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

const AdminRoute = ({ element }) => {
  const { user } = useAuth();

  if (!user || !(user.admin === true || user.admin === 1)) {
    // Redirect to home if not admin
    return <Navigate to="/" />;
  }

  // Render the component for admins
  return element;
};

export default AdminRoute;
