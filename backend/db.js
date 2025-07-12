const { Pool } = require("pg");
require("dotenv").config();
const pool = new Pool({
  user: process.env.PGUSER,
  host: process.env.PGHOST,
  database: process.env.PGDATABASE,
  password: process.env.PGPASSWORD,
  port: process.env.PGPORT,
});
// pool.query("select * from users").then((res) => res.rows);

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
