import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';

import Login from './components/Login.jsx';
import Register from './components/Register.jsx';
import AdminDashboard from './components/AdminDashboard.jsx';
import StaffDashboard from './components/StaffDashboard.jsx';
import AddProduct from './components/AddProduct.jsx';
import EditProduct from './components/EditProduct.jsx';
import RecordPurchase from './components/RecordPurchase.jsx';
import RecordSale from './components/RecordSale.jsx';
import Reports from './components/Reports.jsx';
import ProductList from './components/ProductList.jsx';
import PurchaseHistory from './components/PurchaseHistory.jsx';
import SalesHistory from './components/SalesHistory.jsx';
import Header from './components/Header.jsx';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      const decoded = jwtDecode(token);
      setUser(decoded.user);
    } else {
      localStorage.removeItem('token');
      setUser(null);
    }
  }, [token]);

  const renderDashboard = () => {
    if (!user) {
      return <Navigate to="/login" />;
    }
    switch (user.role) {
      case 'admin':
        return <AdminDashboard token={token} />;
      case 'staff':
        return <StaffDashboard token={token} />;
      default:
        return <Navigate to="/login" />;
    }
  };

  return (
    <Router>
      <Header user={user} setToken={setToken} />
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/dashboard" element={renderDashboard()} />
        <Route path="/products" element={<ProductList token={token} />} />
        <Route path="/add-product" element={<AddProduct token={token} />} />
        <Route path="/edit-product/:id" element={<EditProduct token={token} />} />
        <Route path="/purchase-history" element={<PurchaseHistory token={token} />} />
        <Route path="/sales-history" element={<SalesHistory token={token} />} />
        <Route path="/record-purchase" element={<RecordPurchase token={token} />} />
        <Route path="/record-sale" element={<RecordSale token={token} />} />
        <Route path="/reports" element={<Reports token={token} />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
