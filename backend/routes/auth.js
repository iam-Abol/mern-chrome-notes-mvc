const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();
const bcrypt = require("bcrypt");
const { body } = require("express-validator");
const User = require("../models/user");

router.get("/login", authController.getLogin);
router.post(
  "/login",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({ min: 6 }).withMessage("password is to short"),
  ],
  authController.postLogin
);
router.get("/signup", authController.getSignUp);
router.post(
  "/signup",
  [
    body("email").isEmail().withMessage("invalid email"),
    body("password").isLength({ min: 6 }).withMessage("password is to short"),
    body("username").not().isEmpty().withMessage("username cant be empty"),
  ],
  authController.postSignUp
);
router.get("/logout", (req, res, next) => {
  req.session.destroy();
  res.redirect("/login");
});
module.exports = router;
