const mysql = require("mysql2");

// Connect to database
const db = mysql.createConnection(
  {
    host: "localhost",
    // Your MySQL username,
    user: "root",
    // Your MySQL password
    password: "Clarke@1993",
    database: "employee_watcher",
  },
  console.log("Connected to the Employee Watcher database.")
);


module.exports = db;