const bcrypt = require("bcrypt");
const User = require("../models/user");

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
