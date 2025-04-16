import React, { useState, useEffect } from 'react';
import API from '../api';
import { useNavigate } from 'react-router-dom';

import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';


const Login = () => {
  const [form, setForm] = useState({ email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      navigate('/add-product'); // redirect to Add Product page
    }
  }, [navigate]);


  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post('/auth/login', form);
      localStorage.setItem('token', res.data.token);
      alert('Login successful');
      navigate('/add-product');
    } catch (err) {
      alert('Error: ' + err.response.data.message);
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
    <form onSubmit={handleSubmit}  className="register-form">
      <h2>Login</h2>
      <input name="email" placeholder="Email" onChange={handleChange} required />
      <input name="password" placeholder="Password" type="password" onChange={handleChange} required />
      <button type="submit">Login</button>
    </form>
    </div>
    </div>
  );
};

export default Login;
