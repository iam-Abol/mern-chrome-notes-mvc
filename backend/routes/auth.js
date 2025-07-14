const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const bcrypt = require("bcrypt");

const User = require("../models/user");

router.get("/login", authController.getLogin);
router.post("/login", authController.postLogin);
router.get("/signup", authController.getSignUp);
router.post("/signup", authController.postSignUp);
router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
});
module.exports = router;
