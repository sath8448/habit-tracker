import React, { useEffect, useState } from 'react';

const Dashboardhome = () => {
  const [habits, setHabits] = useState([]);
  const userId = localStorage.getItem('userId');

useEffect(() => {
  const fetchHabits = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/dashboard/${userId}`);
      const data = await res.json();

      if (Array.isArray(data)) {
        setHabits(data);
      } else {
        console.error('Expected array but got:', data);
        setHabits([]); // fallback to empty list
      }
    } catch (err) {
      console.error('Error fetching habits:', err);
      setHabits([]); // fallback on fetch failure
    }
  };

  fetchHabits();
}, [userId]);


  return (
    <div className="dashboard-home">
      <h2>Welcome back!</h2>
      <h3>📅 Today's Habits:</h3>
      {habits.length === 0 ? (
        <p>No habits found for today.</p>
      ) : (
        <ul>
          {habits.map((habit) => (
            <li key={habit.habit_id}>
              <input type="checkbox" checked={habit.status === 'done'} readOnly />
              {habit.name}
            </li>
          ))}
        </ul>
      )}
      <p>💪 Stay consistent and smash your goals!</p>
    </div>
  );
};

export default Dashboardhome;
