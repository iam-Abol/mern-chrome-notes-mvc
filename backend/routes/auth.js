const express = require("express");

const router = express.Router();

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
module.exports = router;
