import React from 'react';
import Navigation from './Navigation';
import Dashboard from './Dashboard';

const AdminDashboard = ({ token }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Navigation />
      <Dashboard token={token} />
    </div>
  );
};

export default AdminDashboard;
