import React, { useState, useEffect } from 'react';

import API from '../api';
import './AddProduct.css'; // Make sure this path matches

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const AddProduct = () => {
  const [form, setForm] = useState({ name: '', quantity: '', price: '' });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/add-product'); // redirect to Add Product page
    }
  }, [navigate]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login'); // redirect to login if not logged in
    }
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (file) data.append('photo', file);

    try {
      await API.post('/products/add', data);
      alert('Product added');
    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (
    
    <div>
      <nav className="navbar">
  {/* <Link to="/">Register</Link> */}
  {/* <Link to="/login">Login</Link> */}
  <Link to="/add-product">Add Product</Link>
  
  <button onClick={() => {
    localStorage.removeItem('token');
    navigate('/login');
  }} style={{ marginLeft: '10px', padding: '6px 12px', cursor: 'pointer' }}>
    Logout
  </button>
</nav>

    <div className="add-product-page">
      {/* <nav>
        <Link to="/">Register</Link> | <Link to="/login">Login</Link> | <Link to="/add-product">Add Product</Link>
      </nav> */}
      <form onSubmit={handleSubmit} className="add-product-form" encType="multipart/form-data">
        <h2>Add New Product</h2>
        <input name="name" placeholder="Product Name" onChange={handleChange} required />
        <input name="quantity" type="number" placeholder="Quantity" onChange={handleChange} required />
        <input name="price" type="number" placeholder="Price (₹)" step="0.01" onChange={handleChange} required />
        <input type="file" onChange={e => setFile(e.target.files[0])} />
        <button type="submit">Add Product</button>
      </form>
      </div>
    </div>
  );
};

export default AddProduct;
