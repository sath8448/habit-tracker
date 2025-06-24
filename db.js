const mysql = require('mysql');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '', // set your XAMPP MySQL password if any
  database: 'habit_tracker'
});

db.connect((err) => {
  if (err) throw err;
  console.log(' Connected to MySQL');
});

module.exports = db;
