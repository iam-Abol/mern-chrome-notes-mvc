const express = require("express");
const authController = require("../controllers/auth");
const router = express.Router();

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
router.post("/signup", authController.postSignUp);
module.exports = router;
