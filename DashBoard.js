import React from 'react';
import { Link, Outlet } from 'react-router-dom';
import './App.css';

const Dashboard = () => {
  return (
    <div className="dashboard">
      <div className="sidebar">
        <h2>Habit Tracker</h2>
        <ul>
          <li><Link to="/dashboard">🏠 Dashboard</Link></li>
          <li><Link to="/dashboard/add-habit">➕ Add Habit</Link></li>
          <li><Link to="/dashboard/calendar">📅 View Calendar</Link></li>
          <li><Link to="/dashboard/progress">📊 Progress</Link></li>
          <li><Link to="/dashboard/settings">⚙️ Settings</Link></li>
          <li><Link to="/">🚪 Logout</Link></li>
        </ul>
      </div>

      <div className="main-area">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
