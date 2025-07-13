const express = require("express");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
const Note = require("../models/note");

router.get("/notes", authMiddleware, async (req, res, next) => {
  let notes = await Note.getNotes();
  notes = notes.rows;
  res.send(notes);
});

module.exports = router;
