const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

// Import route handlers
const authRoutes = require('./auth');
const habitRoutes = require('./habitRoutes');

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Routes
app.use('/api/auth', authRoutes); // Handles login/signup
app.use('/api', habitRoutes);     // Handles habits, dashboard, calendar, progress

// Server start
const PORT = 5000;
app.listen(PORT, () => console.log(`🚀 Server running on http://localhost:${PORT}`));
