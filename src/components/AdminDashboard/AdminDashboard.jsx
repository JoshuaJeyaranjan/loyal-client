import React from 'react';
import { Link, Routes, Route } from 'react-router-dom';
import AddInventory from '../AddInventory/AddInventory';
import EditInventory from '../EditInventory/EditInventory';
import UserList from '../UserList/UserList';
import AdminRoute from '../../AdminRoute'; // Ensure AdminRoute is correctly imported

const AdminDashboard = () => (
  <div>
    <h1>Admin Dashboard</h1>
    <nav>
      <ul>
        <li><Link to="/admin/add-inventory">Add Inventory</Link></li>
        <li><Link to="/admin/edit-inventory">Edit Inventory</Link></li>
        <li><Link to="/admin/users">View Users</Link></li>
      </ul>
    </nav>
    <Routes>
      <Route path="add-inventory" element={<AdminRoute element={<AddInventory />} />} />
      <Route path="edit-inventory" element={<AdminRoute element={<EditInventory />} />} />
      <Route path="users" element={<AdminRoute element={<UserList />} />} />
    </Routes>
  </div>
);

export default AdminDashboard;
