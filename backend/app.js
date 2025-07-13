require("dotenv").config();

const express = require("express");

const app = express();

const path = require("path");

const authRoutes = require("./routes/auth");

const expressSession = require("express-session");

const pool = require("./db").pool;

const pgSession = require("connect-pg-simple")(expressSession);

/////
/////
/////

app.set("view engine", "ejs");
app.set("views", "views");

app.use(
  expressSession({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 24 * 60 * 60 * 1000 },
  })
);
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
