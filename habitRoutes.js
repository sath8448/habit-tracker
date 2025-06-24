const express = require('express');
const router = express.Router();
const db = require('./db');
const moment = require('moment');

// Add Habit
router.post('/habits/add', (req, res) => {
  const { user_id, name, frequency, start_date } = req.body;

  if (!user_id || !name || !frequency || !start_date) {
    return res.status(400).json({ message: 'Missing fields' });
  }

  const sql = `INSERT INTO habits (user_id, name, frequency, start_date)
               VALUES (?, ?, ?, ?)`;

  db.query(sql, [user_id, name, frequency, start_date], (err, result) => {
    if (err) {
      console.error(' MySQL Insert Error:', err);
      return res.status(500).json({ error: err });
    }
    res.status(201).json({ message: 'Habit added successfully' });
  });
});

// Dashboard - Today's Habits
router.get('/dashboard/:userId', (req, res) => {
  const userId = req.params.userId;
  const today = moment().format('YYYY-MM-DD');

  const sql = `
    SELECT h.id AS habit_id, h.name, hs.status
    FROM habits h
    LEFT JOIN habit_status hs
      ON h.id = hs.habit_id AND hs.status_date = ?
    WHERE h.user_id = ?
  `;

  db.query(sql, [today, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(Array.isArray(results) ? results : []);
  });
});

// Calendar - Habits for Specific Date
router.get('/calendar/:userId/:date', (req, res) => {
  const { userId, date } = req.params;

  const sql = `
    SELECT h.name, hs.status
    FROM habits h
    LEFT JOIN habit_status hs
      ON h.id = hs.habit_id AND hs.status_date = ?
    WHERE h.user_id = ?
  `;

  db.query(sql, [date, userId], (err, results) => {
    if (err) return res.status(500).json({ error: err });
    res.json(Array.isArray(results) ? results : []);
  });
});

// Progress - Summary per Habit
router.get('/progress/:userId', (req, res) => {
  const userId = req.params.userId;

  const sql = `
    SELECT 
      h.name,
      COUNT(hs.habit_id) AS total_count,
      SUM(CASE WHEN hs.status = 'done' THEN 1 ELSE 0 END) AS done_count
    FROM habits h
    LEFT JOIN habit_status hs ON h.id = hs.habit_id
    WHERE h.user_id = ?
    GROUP BY h.id
  `;

  db.query(sql, [userId], (err, results) => {
    if (err) {
      console.error(' Progress SQL error:', err);
      return res.status(500).json({ error: err });
    }
    res.json(Array.isArray(results) ? results : []);
  });
});

module.exports = router;
