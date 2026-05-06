import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const navigate = useNavigate();
  const token = localStorage.getItem('token');

  useEffect(() => {
    // IMPORTANT: '!' undali. Leda ante white screen vastundi
    if (!token) {
      navigate('/login');
      return;
    }
    
    const fetchTasks = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/tasks', {
          headers: { 'x-auth-token': token }
        });
        setTasks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchTasks();
  }, [navigate, token]);

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/tasks', 
        { title, description },
        { headers: { 'x-auth-token': token } }
      );
      setTasks([...tasks, res.data]);
      setTitle('');
      setDescription('');
    } catch (err) {
      console.log(err);
      alert('Failed to add task');
    }
  };

  const handleDeleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/${id}`, {
        headers: { 'x-auth-token': token }
      });
      setTasks(tasks.filter(task => task._id !== id));
    } catch (err) {
      console.log(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    navigate('/login');
  };

  return (
    <div style={{ padding: 20, maxWidth: 800, margin: 'auto' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1>Welcome Shirisha 🎉</h1>
        <button onClick={handleLogout} style={{ padding: '10px 20px', background: 'red', color: 'white', border: 'none', cursor: 'pointer' }}>
          Logout
        </button>
      </div>
      
      <h2>Add New Task</h2>
      <form onSubmit={handleAddTask} style={{ marginBottom: 30 }}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          style={{ display: 'block', width: '100%', padding: 10, marginBottom: 10, border: '1px solid #ccc' }}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ display: 'block', width: '100%', padding: 10, marginBottom: 10, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#4CAF50', color: 'white', border: 'none', cursor: 'pointer' }}>
          Add Task
        </button>
      </form>

      <h2>Your Tasks</h2>
      {tasks.length === 0 ? (
        <p>No tasks yet. Add your first task!</p>
      ) : (
        tasks.map(task => (
          <div key={task._id} style={{ border: '1px solid #ddd', padding: 15, marginBottom: 10, borderRadius: 5 }}>
            <h3 style={{ margin: '0 0 10px 0' }}>{task.title}</h3>
            <p style={{ margin: '0 0 10px 0', color: '#666' }}>{task.description}</p>
            <button 
              onClick={() => handleDeleteTask(task._id)}
              style={{ padding: '5px 15px', background: '#f44336', color: 'white', border: 'none', cursor: 'pointer' }}
            >
              Delete
            </button>
          </div>
        ))
      )}
    </div>
  );
}

export default Dashboard;