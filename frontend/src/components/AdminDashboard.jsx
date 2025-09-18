import React from 'react';
import Dashboard from './Dashboard';

const AdminDashboard = ({ token }) => {
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <Dashboard token={token} />
    </div>
  );
};

export default AdminDashboard;
