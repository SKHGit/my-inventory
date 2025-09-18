import React from 'react';
import { Link } from 'react-router-dom';
import SalesHistory from './SalesHistory';

const StaffDashboard = ({ token }) => {
  return (
    <div>
      <h1>Staff Dashboard</h1>
      <div>
        <Link to="/record-sale">Record Sale</Link>
      </div>
      <SalesHistory token={token} />
    </div>
  );
};

export default StaffDashboard;
