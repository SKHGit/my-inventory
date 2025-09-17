import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import jwt_decode from 'jwt-decode';

import Login from './components/Login';
import Register from './components/Register';
import AdminDashboard from './components/AdminDashboard';
import StaffDashboard from './components/StaffDashboard';
import AddProduct from './components/AddProduct';
import EditProduct from './components/EditProduct';
import RecordPurchase from './components/RecordPurchase';
import RecordSale from './components/RecordSale';
import Reports from './components/Reports';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      localStorage.setItem('token', token);
      const decoded = jwt_decode(token);
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
      <Routes>
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register setToken={setToken} />} />
        <Route path="/dashboard" element={renderDashboard()} />
        <Route path="/add-product" element={<AddProduct token={token} />} />
        <Route path="/edit-product/:id" element={<EditProduct token={token} />} />
        <Route path="/record-purchase" element={<RecordPurchase token={token} />} />
        <Route path="/record-sale" element={<RecordSale token={token} />} />
        <Route path="/reports" element={<Reports token={token} />} />
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
};

export default App;
