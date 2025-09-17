import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PurchaseHistory = ({ token }) => {
  const [purchases, setPurchases] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const res = await axios.get('/api/purchases', {
          headers: { 'x-auth-token': token },
        });
        setPurchases(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchPurchases();
  }, [token]);

  return (
    <div>
      <h2>Purchase History</h2>
      <table>
        <thead>
          <tr>
            <th>Product</th>
            <th>Supplier</th>
            <th>Invoice</th>
            <th>Quantity</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {purchases.map(purchase => (
            <tr key={purchase._id}>
              <td>{purchase.product ? purchase.product.name : 'N/A'}</td>
              <td>{purchase.supplier}</td>
              <td>{purchase.invoice}</td>
              <td>{purchase.quantity}</td>
              <td>{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PurchaseHistory;
