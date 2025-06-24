import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './App.css';

const CalendarView = () => {
  const [habitDates, setHabitDates] = useState({});
  const [habitList, setHabitList] = useState([]);
  const [selectedHabit, setSelectedHabit] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [habitStatusForDate, setHabitStatusForDate] = useState([]);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    const fetchHabits = async () => {
      const res = await fetch(`http://localhost:5000/api/calendar/${userId}`);
      const data = await res.json();

      const grouped = {};
      data.forEach(entry => {
        if (!grouped[entry.name]) {
          grouped[entry.name] = [];
        }
        grouped[entry.name].push(new Date(entry.status_date));
      });

      setHabitDates(grouped);
      setHabitList(Object.keys(grouped));
      setSelectedHabit(Object.keys(grouped)[0] || '');
    };

    fetchHabits();
  }, [userId]);

  const tileClassName = ({ date, view }) => {
    if (view === 'month') {
      for (let habit in habitDates) {
        if (
          habitDates[habit].some(d => d.toDateString() === date.toDateString())
        ) {
          return 'highlight'; // ✅ Marked as done
        }
      }
    }
    return null;
  };

  const handleDateClick = async (date) => {
    setSelectedDate(date);
    const isoDate = date.toISOString().split('T')[0];

    try {
      const res = await fetch(`http://localhost:5000/api/calendar/${userId}/${isoDate}`);
      const data = await res.json();
      setHabitStatusForDate(data);
    } catch (err) {
      console.error('Error fetching habit status:', err);
    }
  };

  return (
    <div className="calendar-container">
      <h2>📆 Habit Completion Calendar</h2>

      <Calendar
        onChange={handleDateClick}
        value={selectedDate}
        tileClassName={tileClassName}
      />

      {habitStatusForDate.length > 0 && (
        <div className="habit-status-list">
          <h3>📅 Habits on {selectedDate.toDateString()}:</h3>
          <ul>
            {habitStatusForDate.map((habit, idx) => (
              <li key={idx}>
                {habit.name} —{' '}
                <span
                  className={
                    habit.status === 'done' ? 'status-done' : 'status-missed'
                  }
                >
                  {habit.status === 'done' ? '✅ Done' : '❌ Missed'}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default CalendarView;
