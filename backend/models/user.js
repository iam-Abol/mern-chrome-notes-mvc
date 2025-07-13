const db = require("../db");

exports.createUser = async (email, hashPassword, username) => {
  const result = await db.query(
    "insert into users (username,email,password) values ($1,$2,$3) returning *",
    [username, email, hashPassword]
  );
  return result.rows[0];
};
exports.findByEmail = (email) => {
  return db.query("select * from users where email= $1  ", [email]);
};

exports.findByUsername = (username) => {
  return db.query("select * from users where username= $1  ", [username]);
};
