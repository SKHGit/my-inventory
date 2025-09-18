import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AddProduct = ({ token }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    brand: '',
    supplier: '',
    costPrice: '',
    sellingPrice: '',
    stockQuantity: '',
    reorderLevel: '',
  });

  const {
    name,
    category,
    brand,
    supplier,
    costPrice,
    sellingPrice,
    stockQuantity,
    reorderLevel,
  } = formData;

  const onChange = e =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('/api/products', formData, {
        headers: { 'x-auth-token': token },
      });
      navigate('/dashboard');
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <form onSubmit={onSubmit}>
      <input type="text" placeholder="Name" name="name" value={name} onChange={onChange} required />
      <input type="text" placeholder="Category" name="category" value={category} onChange={onChange} required />
      <input type="text" placeholder="Brand" name="brand" value={brand} onChange={onChange} />
      <input type="text" placeholder="Supplier" name="supplier" value={supplier} onChange={onChange} />
      <input type="number" placeholder="Cost Price" name="costPrice" value={costPrice} onChange={onChange} required />
      <input type="number" placeholder="Selling Price" name="sellingPrice" value={sellingPrice} onChange={onChange} required />
      <input type="number" placeholder="Stock Quantity" name="stockQuantity" value={stockQuantity} onChange={onChange} required />
      <input type="number" placeholder="Reorder Level" name="reorderLevel" value={reorderLevel} onChange={onChange} />
      <button type="submit">Add Product</button>
    </form>
  );
};

export default AddProduct;
