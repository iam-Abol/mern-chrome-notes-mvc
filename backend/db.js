const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool(
  process.env.DATABASE_URL
    ? {
        connectionString: process.env.DATABASE_URL,
        ssl: { rejectUnauthorized: false },
      }
    : {
        user: process.env.PGUSER,
        host: process.env.PGHOST,
        database: process.env.PGDATABASE,
        password: process.env.PGPASSWORD,
        port: process.env.PGPORT,
      }
);
// pool.query("select * from users").then((res) => res.rows);
console.log(
  process.env.DATABASE_URL ? "Using DATABASE_URL" : "Using local PG config"
);

module.exports = {
  query: (text, params) => pool.query(text, params),
  pool,
};
