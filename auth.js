const express = require('express');
const router = express.Router(); // ✅ Required!
const db = require('./db'); // or '../db' if it's one folder up

// Signup route
router.post('/signup', (req, res) => {
  const { name, email, password } = req.body;

  const checkUser = 'SELECT * FROM users WHERE email = ?';
  db.query(checkUser, [email], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length > 0) {
      return res.status(409).json({ message: 'Email already registered' });
    }

    const insertUser = 'INSERT INTO users (name, email, password) VALUES (?, ?, ?)';
    db.query(insertUser, [name, email, password], (err, result) => {
      if (err) return res.status(500).json({ error: err });

      res.status(201).json({ message: 'User registered successfully', userId: result.insertId });
    });
  });
});

// Login route
router.post('/login', (req, res) => {
  const { email, password } = req.body;

  const sql = 'SELECT * FROM users WHERE email = ? AND password = ?';
  db.query(sql, [email, password], (err, result) => {
    if (err) return res.status(500).json({ error: err });

    if (result.length > 0) {
      res.json({ message: 'Login successful', user: result[0] });
    } else {
      res.status(401).json({ message: 'Invalid credentials' });
    }
  });
});
// Update user settings
router.put('/settings/:userId', (req, res) => {
  const userId = req.params.userId;
  const { name, email } = req.body;

  const sql = `UPDATE users SET name = ?, email = ? WHERE id = ?`;
  db.query(sql, [name, email, userId], (err, result) => {
    if (err) return res.status(500).json({ error: err });
    res.json({ message: 'User updated successfully' });
  });
});

module.exports = router;
