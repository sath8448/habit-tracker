import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './Home';
import DashBoard from './DashBoard';
import Dashboardhome from './Dashboardhome';
import AddHabit from './AddHabit';
import CalendarView from './CalendarView';
import Progress from './Progress';
import Settings from './Settings';


import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/dashboard" element={<DashBoard />}>
          <Route index element={<Dashboardhome />} />
          <Route path="add-habit" element={<AddHabit />} />
          <Route path="calendar" element={<CalendarView />} />
          <Route path="progress" element={<Progress />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
