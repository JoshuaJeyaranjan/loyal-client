import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import SignupPage from './pages/SignupPage/SignupPage';
import Profile from './pages/Profile/Profile';
import Cart from './components/Cart/Cart';
import ProductDetails from './components/ProductDetails/ProductDetails';
import Checkout from './components/Checkout/Checkout';
import Success from './components/Success/Success';
import Cancel from './components/Cancel/Cancel';
import AdminDashboard from './components/AdminDashboard/AdminDashboard';
import AddInventory from './components/AddInventory/AddInventory';
import EditInventory from './components/EditInventory/EditInventory';
import UserList from './components/UserList/UserList';
import { AuthProvider } from './AuthContext';
import AdminRoute from './AdminRoute';
import AdminInventoryList from './components/AdminInventoryList/AdminInventoryList';
import ContactPage from './pages/ContactPage/ContactPage';
import CollectionPage from './pages/CollectionsPage/CollectionsPage';
import CollectionsListPage from './pages/CollectionListPage/CollectionListPage';
import CreateCollection from './components/CreateCollection/CreateCollection';
import AssignProductsToCollection from './components/AssignProductsToCollection/AssignProductsToCollection';
import EditCollection from './components/EditCollection/EditCollection';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/success" element={<Success />} />
          <Route path="/cancel" element={<Cancel />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path='/collection/:id' element={<CollectionPage/>}/>
          <Route path='/collections/' element={<CollectionsListPage/>}/>

          {/* Admin Routes */}
          <Route path="/admin" element={<AdminRoute element={<AdminDashboard />} />} />
          <Route path='/admin/edit-inventory' element={<AdminRoute element={<AdminInventoryList/>} />} />
          <Route path='/admin/edit-collection' element={<AdminRoute element={<EditCollection/>} />} />
          <Route path="/admin/add-inventory" element={<AdminRoute element={<AddInventory />} />} />
          <Route path="/admin/create-collection" element={<AdminRoute element={<CreateCollection />} />} />
          <Route path="/admin/assign-products" element={<AdminRoute element={<AssignProductsToCollection />} />} />
          <Route path="/admin/edit-inventory/:id" element={<AdminRoute element={<EditInventory />} />} />
          <Route path="/admin/users" element={<AdminRoute element={<UserList />} />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
