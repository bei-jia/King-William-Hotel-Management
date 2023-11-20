const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "1201_Bear",
  database: "king_william_db",
});

module.exports = pool;

