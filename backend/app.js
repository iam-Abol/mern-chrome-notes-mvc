const express = require("express");
const app = express();
const authRoutes = require("./routes/auth");

app.set("view engine", "ejs");
app.set("views", "views");

app.use(express.urlencoded({ extended: false }));
app.use(authRoutes);
app.listen(3000, () => {
  console.log("connected");
});
