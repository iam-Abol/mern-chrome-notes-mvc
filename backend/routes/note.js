const express = require("express");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
const Note = require("../models/note");
const noteController = require("../controllers/note");
router.get("/", authMiddleware, noteController.getIndex);
router.post("/", authMiddleware, noteController.postIndex);
router.get("/create", authMiddleware, noteController.getCreate);
router.post("/delete/:noteId", authMiddleware, noteController.deleteNote);

router.post("/pdf/:noteId", authMiddleware, noteController.getPdf);

router.get("/show/:noteId", authMiddleware, noteController.showNote);
router.get("/edit/:noteId", authMiddleware, async (req, res, next) => {
  const { noteId } = req.params;
  try {
    let note = await Note.getNote(noteId);
    if (note.rowCount != 1) return res.redirect("/");
    note = note.rows[0];

    if (note.user_id != req.session.userId)
      throw new Error("not authenticated");
    console.log(note); /////////////////////////////////

    const { title, content } = note;
    res.render("notes/edit", { title: "EDIT", note });
  } catch (error) {}
});

router.post("/update/:noteId", async (req, res, next) => {
  console.log("here in update");

  const { title, content } = req.body;
  const { noteId } = req.params;
  console.log(title, content, noteId);

  try {
    await Note.updateNote(noteId, title, content);
    res.redirect("/show/" + noteId);
  } catch (error) {
    //
    console.log(error);

    res.send(error);
  }
  // res.send(title + content);
});
module.exports = router;
