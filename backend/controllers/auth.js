const bcrypt = require("bcrypt");
const User = require("../models/user");

exports.getSignUp = (req, res, next) => {
  res.render("auth/signup");
};

exports.postSignUp = async (req, res, next) => {
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
    req.session.isLoggedIn = true;
    res.send("loged in");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
exports.getLogin = (req, res, next) => {
  console.log(req.session);

  res.render("auth/login");
};
