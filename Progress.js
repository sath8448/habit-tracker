import React, { useEffect, useState } from 'react';
import './App.css';

const Progress = () => {
  const [progressData, setProgressData] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchProgress = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/progress/${userId}`);
        const data = await res.json();
        console.log("📦 Progress API Response:", data);
        
        // Ensure it's an array
        setProgressData(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error('❌ Fetch error:', err);
        setProgressData([]);
      }
    };

    fetchProgress();
  }, [userId]);

  return (
    <div className="progress-container">
      <h2>📈 Your Habit Progress</h2>
      {progressData.length === 0 ? (
        <p>No progress data available.</p>
      ) : (
        <ul className="progress-list">
          {progressData.map((habit, idx) => {
            const percent = habit.total_count
              ? Math.round((habit.done_count / habit.total_count) * 100)
              : 0;

            return (
              <li key={idx}>
                <strong>{habit.name}</strong>
                <div className="progress-bar">
                  <div
                    className="progress-fill"
                    style={{ width: `${percent}%` }}
                  >
                    {percent}%
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default Progress;
