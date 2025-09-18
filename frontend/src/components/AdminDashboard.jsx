import React from 'react';
import { Link } from 'react-router-dom';
import Dashboard from './Dashboard';

const AdminDashboard = ({ token }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <div>
        <Link to="/add-product">Add Product</Link> |{' '}
        <Link to="/record-purchase">Record Purchase</Link> |{' '}
        <Link to="/record-sale">Record Sale</Link> |{' '}
        <Link to="/reports">Reports</Link>
      </div>
      <Dashboard token={token} />
    </div>
  );
};

export default AdminDashboard;
