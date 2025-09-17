import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const RecordPurchase = ({ token }) => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [formData, setFormData] = useState({
    product: '',
    supplier: '',
    invoice: '',
    quantity: '',
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get('/api/products', {
          headers: { 'x-auth-token': token },
        });
        setProducts(res.data);
      } catch (err) {
        console.error(err.response.data);
      }
    };
    fetchProducts();
  }, [token]);

  const { product, supplier, invoice, quantity } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/purchases', formData, {
        headers: { 'x-auth-token': token },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <select name="product" value={product} onChange={onChange} required>
        <option value="">Select Product</option>
        {products.map(p => (
          <option key={p._id} value={p._id}>
            {p.name}
          </option>
        ))}
      </select>
      <input type="text" placeholder="Supplier" name="supplier" value={supplier} onChange={onChange} />
      <input type="text" placeholder="Invoice" name="invoice" value={invoice} onChange={onChange} />
      <input type="number" placeholder="Quantity" name="quantity" value={quantity} onChange={onChange} required />
      <button type="submit">Record Purchase</button>
    </form>
  );
};

export default RecordPurchase;
