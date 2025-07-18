const bcrypt = require("bcrypt");
const User = require("../models/user");
const { validationResult } = require("express-validator");
exports.getSignUp = (req, res, next) => {
  res.render("auth/signup", { title: "SIGNUP" });
};

exports.postSignUp = async (req, res, next) => {
  let { email, password, username } = req.body;
  const error = validationResult(req);
  // return res.send(error.array());
  if (!error.isEmpty()) {
    req.flash("error", error.array()[0].msg);
    return res.redirect("/signup");
  }
  try {
    let emailCheck = await User.findByEmail(email);
    console.log(emailCheck.rowCount);

    if (emailCheck.rowCount != 0) {
      req.flash("error", "email already registered");
      return res.redirect("/signup");
    }

    let usernameCheck = await User.findByUsername(username);
    if (usernameCheck.rowCount != 0) {
      req.flash("error", "this username is already used");
      return res.redirect("/signup");
    }

    const hashPassword = await bcrypt.hash(password, 12);

    const data = await User.createUser(email, hashPassword, username);
    console.log(data);

    res.redirect("/login");
  } catch (error) {
    next(err);
  }
};
exports.postLogin = async (req, res, next) => {
  // res.send(req.body);
  const { email, password } = req.body;
  try {
    const data = await User.findByEmail(email);
    // if(data.user)
    if (data.rowCount != 1) throw new Error("invalid email");
    const user = data.rows[0];
    const isEqual = await bcrypt.compare(password, user.password);
    if (!isEqual) throw new Error("invalid password");

    req.session.userId = user.id;
    req.session.username = user.username;
    req.session.isLoggedIn = true;
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
exports.getLogin = (req, res, next) => {
  // console.log(req.session);

  res.render("auth/login", { title: "LOGIN" });
};
