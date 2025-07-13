const express = require("express");

const User = require("../models/user");
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
    let emailCheck = await User.findByEmail(email);
    console.log(emailCheck.rowCount);

    if (emailCheck.rowCount != 0) {
      throw new Error("email exist");
    }

    let usernameCheck = await User.findByUsername(username);
    if (usernameCheck.rowCount != 0) {
      throw new Error("username exist");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const data = await User.createUser(email, hashPassword, username);
    console.log(data);

    res.redirect("/login");
  } catch (error) {
    console.log(error);
    res.send("error");
    //implement error handling later
  }
});
module.exports = router;
