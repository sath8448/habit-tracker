import React, { useState } from 'react';

const AddHabit = () => {
  const [name, setName] = useState('');
  const [frequency, setFrequency] = useState('Daily');
  const [startDate, setStartDate] = useState('');

  const handleAddHabit = async (e) => {
    e.preventDefault();
    const userId = localStorage.getItem('userId'); // ✅ get logged-in user ID

    if (!userId) {
      alert("User not logged in");
      return;
    }

    try {
      const res = await fetch('http://localhost:5000/api/habits/add', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: userId,
          name,
          frequency,
          start_date: startDate,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        alert('Habit added!');
        setName('');
        setStartDate('');
      } else {
        alert(data.message || 'Error adding habit');
      }
    } catch (err) {
      console.error('Add habit error:', err);
    }
  };

  return (
    <div className="form-container">
      <h2>Add New Habit</h2>
      <form onSubmit={handleAddHabit}>
        <input
          type="text"
          placeholder="Habit name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <select value={frequency} onChange={(e) => setFrequency(e.target.value)}>
          <option value="Daily">Daily</option>
          <option value="Weekly">Weekly</option>
        </select>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          required
        />
        <button type="submit">Add Habit</button>
      </form>
    </div>
  );
};

export default AddHabit;
