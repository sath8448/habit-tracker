import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './App.css';

const Home = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate(); // ✅ for redirecting after login

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Login successful!');
        console.log(data);
        localStorage.setItem('userId', data.user.id); // ✅ store user ID
        navigate('/dashboard');
      } else {
        alert(data.message || 'Login failed');
      }
    } catch (err) {
      console.error('Login error:', err);
    }
  };

  return (
    <div>
      {/* Navbar */}
      <nav className="navbar">
        <div className="logo">Habit Planner</div>
        <ul className="nav-links">
          <li>Home</li>
          <li>Settings</li>
          <li>Login</li>
        </ul>
      </nav>

      {/* Main Content */}
      <div className="main-content">
        {/* Left: Image */}
        <div className="left-image">
          <img src="/images/fitness.png" alt="Habit Tracker" />
        </div>

        {/* Right: Sign In Form */}
        <div className="right-form">
          <h2>Sign In</h2>
          <form className="sign-in-form" onSubmit={handleSubmit}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">Sign In</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;

