require("dotenv").config();

const express = require("express");

const app = express();

const path = require("path");

const authRoutes = require("./routes/auth");
const noteRoutes = require("./routes/note");

const expressSession = require("express-session");

const pool = require("./db").pool;

const pgSession = require("connect-pg-simple")(expressSession);
const helmet = require("helmet");
const compression = require("compression");

const authMiddleware = require("./middlewares/auth");
const flash = require("connect-flash");

/////
/////
/////

app.set("view engine", "ejs");
app.set("views", "views");
app.use(helmet());
app.use(compression());
app.use(
  expressSession({
    store: new pgSession({
      pool: pool,
      tableName: "session",
    }),
    secret: process.env.SESSIONSECRET,
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 12 * 60 * 60 * 1000 },
  })
);
app.use(flash());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));
app.use((req, res, next) => {
  res.locals.username = req.session.username || null;
  res.locals.error = req.flash("error") || null;

  next();
});

app.use(authRoutes);
app.use(noteRoutes);

app.use("/", authMiddleware, (req, res, next) => {
  res.render("404", { title: "page not found" });
});
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  // console.log(process.env.DATABASE_URL);

  console.log("connected to ", PORT);
});
app.use((err, req, res, next) => {
  console.log(err);

  res.render("error", {
    title: "ERROR",
    // message: err.message,
    message: "",
    stack: "",
  });
});
