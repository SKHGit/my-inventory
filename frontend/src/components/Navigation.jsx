import React from 'react';
import { Link } from 'react-router-dom';

const Navigation = () => {
  return (
    <nav>
      <Link to="/products">Products</Link> |{' '}
      <Link to="/purchase-history">Purchases</Link> |{' '}
      <Link to="/sales-history">Sales</Link> |{' '}
      <Link to="/reports">Reports</Link> |{' '}
      <Link to="/add-product">Add Product</Link> |{' '}
      <Link to="/record-purchase">Record Purchase</Link> |{' '}
      <Link to="/record-sale">Record Sale</Link>
    </nav>
  );
};

export default Navigation;
