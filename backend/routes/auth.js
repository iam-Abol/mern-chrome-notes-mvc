const express = require("express");
const db = require("../db");
const router = express.Router();

router.get("/login", (req, res, next) => {
  res.render("auth/login");
});
router.get("/signup", (req, res, next) => {
  res.render("auth/signup");
});
router.post("/signup", (req, res, next) => {
  let { email, password, username } = req.body;
});
module.exports = router;
