const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "user1",
  password: "password",
  database: "employee",
});

module.exports = pool;
