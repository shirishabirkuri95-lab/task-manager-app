import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });
      
      // 1. Token save chey
      localStorage.setItem('token', res.data.token);
      
      // 2. Direct ga Dashboard ki vellu - No alert
      navigate('/dashboard');
      
    } catch (err) {
      console.log('Login Error:', err);
      alert('Login failed: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div style={{ padding: 50, maxWidth: 400, margin: 'auto' }}>
      <h2>Task Manager - Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: 10, marginBottom: 10 }}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: 10, marginBottom: 10 }}
        />
        <button 
          type="submit"
          style={{ width: '100%', padding: 10, backgroundColor: '#0d6efd', color: 'white', border: 'none' }}
        >
          Login
        </button>
      </form>
      <p style={{ marginTop: 10 }}>
        New user? <Link to="/register">Register here</Link>
      </p>
    </div>
  );
}

export default Login;