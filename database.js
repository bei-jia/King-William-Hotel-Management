const mysql = require("mysql2");

const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "Pizzle01$$",
  database: "king_william_db",
});

module.exports = pool;
