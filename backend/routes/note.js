const express = require("express");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
const Note = require("../models/note");
const noteController = require("../controllers/note");
router.get("/", authMiddleware, noteController.getIndex);
router.post("/", authMiddleware, noteController.postIndex);
router.get("/create", authMiddleware, noteController.getCreate);
router.post("/delete/:noteId", authMiddleware, noteController.deleteNote);

router.post("/pdf/:noteId", authMiddleware, async (req, res, next) => {
  const { noteId } = req.params;
  // console.log(req.params);
  // console.log(noteId);

  try {
    let note = await Note.getNote(noteId);
    if (note.rowCount != 1) return res.redirect("/");
    note = note.rows[0];
    console.log(note);

    if (note.user_id != req.session.userId)
      throw new Error("not authenticated");
    // await Note.deleteNote(noteId);
    res.send(note);
    // res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
