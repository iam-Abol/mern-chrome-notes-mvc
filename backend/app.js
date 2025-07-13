require("dotenv").config();

const express = require("express");

const app = express();

const path = require("path");

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");

const expressSession = require("express-session");

const pool = require("./db").pool;

const pgSession = require("connect-pg-simple")(expressSession);

const authMiddleware = require("./middlewares/auth");
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
app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  next();
});
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(authRoutes);
app.use(noteRoutes);
app.listen(3000, () => {
  console.log("connected");
});
