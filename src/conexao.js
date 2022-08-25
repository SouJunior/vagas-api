const { Pool } = require("pg");

const pool = new Pool({
  user: "soujunior",
  password: "soujunior",
  host: "localhost",
  port: 5432,
  database: "soujunior"
});

module.exports = { pool };