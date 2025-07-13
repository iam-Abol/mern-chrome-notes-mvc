const express = require("express");
const db = require("../db");
const router = express.Router();
const bcrypt = require("bcrypt");
router.get("/login", (req, res, next) => {
  res.render("auth/login");
});
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
router.post("/signup", async (req, res, next) => {
  let { email, password, username } = req.body;
  try {
    let check = await db.query("select email from users where email= $1  ", [
      email,
    ]);
    console.log(check.rowCount);

    if (check.rowCount != 0) {
      throw new Error("email exist");
      return;
    }

    check = await db.query("select username from users where username= $1  ", [
      username,
    ]);
    if (check.rowCount != 0) {
      throw new Error("username exist");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const data = await db.query(
      "insert into users (username,email,password) values ($1,$2,$3) returning *",
      [username, email, hashPassword]
    );
    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.send("error");
    //implement error handling later
  }
});
module.exports = router;
