const express = require("express");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
const Note = require("../models/note");

router.get("/", authMiddleware, async (req, res, next) => {
  let notes = await Note.getNotes();
  notes = notes.rows;
  console.log(notes);

  res.render("notes/index", { title: "HOME", notes });
});
router.post("/", async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const note = await Note.createNote(title, content, req.session.userId);
    console.log(note);
    res.redirect("/");
  } catch (err) {
    res.send(err);
  }
});
router.get("/create", (req, res, next) => {
  res.render("notes/create", { title: "add note" });
});
module.exports = router;
