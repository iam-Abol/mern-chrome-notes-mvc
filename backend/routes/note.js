const express = require("express");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
const Note = require("../models/note");
const noteController = require("../controllers/note");
router.get("/", authMiddleware, noteController.getIndex);
router.post("/", authMiddleware, noteController.postIndex);
router.get("/create", authMiddleware, noteController.getCreate);
router.post("/delete/:noteId", authMiddleware, noteController.deleteNote);

const PDFDocument = require("pdfkit");

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
    console.log(note); /////////////////////////////////

    const { title, content } = note;
    const extractedDate = new Date().toLocaleString();
    // console.log(extractedDate);

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="${note.title}.pdf"`
    );
    doc.pipe(res);
    doc.end();
    // res.redirect("/");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
