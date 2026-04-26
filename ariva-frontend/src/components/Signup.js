import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Auth.css';

const Signup = () => {
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/signup', form);
      localStorage.setItem('token', res.data.token);
      localStorage.setItem('userId', res.data.user.id);
      navigate('/');
    } catch (err) {
      alert('Signup failed');
    }
  };

  return (
    <div className="auth">
      <h1>Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name</label>
          <input type="text" name="name" value={form.name} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" name="password" value={form.password} onChange={handleChange} required />
        </div>
        <button type="submit">Signup</button>
      </form>
      <p>Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default Signup;