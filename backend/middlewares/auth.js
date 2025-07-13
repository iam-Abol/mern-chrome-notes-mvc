module.exports = (req, res, next) => {
  if (!req.session.isLoggedIn) res.redirect("/login");
  console.log(req.session);
  //   req.session.destroy();
  next();
};
