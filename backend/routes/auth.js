const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});
router.post("/login", async (req, res, next) => {
  // res.send(req.body);
  const { email, password } = req.body;
  try {
    const data = await User.findByEmail(email);
    // if(data.user)
    if (data.rowCount != 1) throw new Error("invalid email");
    const user = data.rows[0];
    const isEqual = await bcrypt.compare(password, user.password);
    if (isEqual) res.send("loged in");
    else throw new Error("invalid pass");

    // console.log(user);
  } catch (error) {
    console.log(error);
    res.send(err);
  }
});
router.get("/signup", authController.getSignUp);
router.post("/signup", authController.postSignUp);
module.exports = router;
