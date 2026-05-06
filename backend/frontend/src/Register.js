import { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/auth/register', { name, email, password });
      alert('Registered Successfully! Please login');
      navigate('/');
    } catch (err) {
      alert('Registration failed: ' + (err.response?.data?.message || 'Server error'));
    }
  };

  return (
    <div style={{padding: 50, maxWidth: 400, margin: 'auto'}}>
      <h2>Task Manager - Register</h2>
      <form onSubmit={handleRegister}>
        <input 
          type="text" 
          placeholder="Name" 
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{width: '100%', padding: 10, marginBottom: 10}}
        /><br/>
        <input 
          type="email" 
          placeholder="Email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          style={{width: '100%', padding: 10, marginBottom: 10}}
        /><br/>
        <input 
          type="password" 
          placeholder="Password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          style={{width: '100%', padding: 10, marginBottom: 10}}
        /><br/>
        <button type="submit" style={{width: '100%', padding: 10}}>Register</button>
      </form>
      <p>Already have account? <Link to="/">Login here</Link></p>
    </div>
  );
}
export default Register;