import React, { useState, useEffect } from 'react';
import axios from 'axios';

const SalesHistory = ({ token }) => {
  const [sales, setSales] = useState([]);

  useEffect(() => {
    const fetchSales = async () => {
      try {
        const res = await axios.get('/api/sales', {
          headers: { 'x-auth-token': token },
        });
        setSales(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchSales();
  }, [token]);

  return (
    <div>
      <h2>Sales History</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Customer</th>
            <th>Invoice</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {sales.map(sale => (
            <tr key={sale._id}>
              <td>{sale.product ? sale.product.name : 'N/A'}</td>
              <td>{sale.customer}</td>
              <td>{sale.invoice}</td>
              <td>{sale.quantity}</td>
              <td>{new Date(sale.saleDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SalesHistory;
