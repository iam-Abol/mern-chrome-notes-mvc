require("dotenv").config();

const express = require("express");

const app = express();

const path = require("path");

const authRoutes = require("./routes/auth");

const expressSession = require("express-session");

const pgSession = require("connect-pg-simple")(expressSession);

/////
/////
/////

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(authRoutes);
app.get("/test", (req, res, next) => {
  console.log("hello");
  res.send("hh");
});
app.listen(3000, () => {
  console.log("connected");
});
