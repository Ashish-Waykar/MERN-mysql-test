import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Register from './components/Register';
import Login from './components/Login';
import AddProduct from './components/AddProduct';

const App = () => {
  return (
    <Router >
      {/* <nav>
        <Link to="/">Register</Link> | <Link to="/login">Login</Link> | <Link to="/add-product">Add Product</Link>
      </nav> */}
      <Routes >
        <Route path="/" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Routes>
    </Router>
  );
};

export default App;
