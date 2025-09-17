import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ProductList = ({ token }) => {
  const [products, setProducts] = useState([]);

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

  const deleteProduct = async id => {
    try {
      await axios.delete(`/api/products/${id}`, {
        headers: { 'x-auth-token': token },
      });
      setProducts(products.filter(product => product._id !== id));
    } catch (err) {
      console.error(err.response.data);
    }
  };

  return (
    <div>
      <h2>Product List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Brand</th>
            <th>Supplier</th>
            <th>Cost Price</th>
            <th>Selling Price</th>
            <th>Stock Quantity</th>
            <th>Reorder Level</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {products.map(product => (
            <tr key={product._id}>
              <td>{product.name}</td>
              <td>{product.category}</td>
              <td>{product.brand}</td>
              <td>{product.supplier}</td>
              <td>{product.costPrice}</td>
              <td>{product.sellingPrice}</td>
              <td>{product.stockQuantity}</td>
              <td>{product.reorderLevel}</td>
              <td>
                <Link to={`/edit-product/${product._id}`}>Edit</Link>
                <button onClick={() => deleteProduct(product._id)}>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ProductList;
