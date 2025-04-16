import React, { useState, useEffect } from 'react';
import API from '../api';
import './Register.css'; // ← CSS file we’ll create
import './Navbar.css'; // ← CSS file we’ll create

import { useNavigate } from 'react-router-dom';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const Register = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
      const token = localStorage.getItem('token');
      if (token) {
        navigate('/add-product'); // redirect to Add Product page
      }
    }, [navigate]);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(form).forEach(key => data.append(key, form[key]));
    if (file) data.append('profile_photo', file);
    try {
      await API.post('/auth/register', data);
      alert('Registration successful');
      navigate('/login');

    } catch (err) {
      alert('Error: ' + (err.response?.data?.message || 'Something went wrong'));
    }
  };

  return (

    <div >
      <nav className="navbar">
  <Link to="/">Register</Link>
  <Link to="/login">Login</Link>
  <Link to="/add-product">Add Product</Link>
</nav>
      <div className="register-page">
        <form onSubmit={handleSubmit} className="register-form" encType="multipart/form-data">
          <h2>Register</h2>
          <input name="name" placeholder="Full Name" onChange={handleChange} required />
          <input name="email" placeholder="Email" type="email" onChange={handleChange} required />
          <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />
          <button type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default Register;
