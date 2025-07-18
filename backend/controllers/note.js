const Note = require("../models/note");
const PDFDocument = require("pdfkit");
const { validationResult } = require("express-validator");
exports.getIndex = async (req, res, next) => {
  const page = +req.query.page || 1;
  // console.log(page);
  const perPage = 5;
  try {
    let count = await Note.getNotesCount(req.session.userId);
    count = count.rows[0].count;
    // console.log("count is ", count);
    const totalPage = Math.ceil(count / perPage);
    if (totalPage < page) {
      res.render("404", { title: "page not found" });
      return;
    }

    let notes = await Note.getNotes(
      req.session.userId,
      perPage,
      (page - 1) * perPage
    );
    notes = notes.rows;
    // console.log(notes);

    res.render("notes/index", { title: "HOME", notes, page, totalPage });
  } catch (err) {
    next(err);
  }
};
exports.postIndex = async (req, res, next) => {
  const { title, content } = req.body;
  const error = validationResult(req);
  if (!error.isEmpty()) {
    req.flash("error", error.array()[0].msg);
    return res.redirect("/create");
  }
  try {
    const note = await Note.createNote(title, content, req.session.userId);
    console.log(note);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
exports.getCreate = (req, res, next) => {
  res.render("notes/create", { title: "add note" });
};
exports.deleteNote = async (req, res, next) => {
  const { noteId } = req.params;
  console.log(req.params);
  console.log(noteId);

  try {
    let note = await Note.getNote(noteId);
    if (note.rowCount != 1) return res.redirect("/");
    note = note.rows[0];
    console.log(note);

    if (note.user_id != req.session.userId)
      throw new Error("not authenticated");
    await Note.deleteNote(noteId);
    res.redirect("/");
  } catch (err) {
    next(err);
  }
};
exports.getPdf = async (req, res, next) => {
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
    doc.text("MY NOTE APP", {
      align: "center",
      lineGap: 25,
    });

    doc
      .fontSize(30)
      .text(note.title, { underline: true, lineGap: 15, align: "center" });

    // doc
    // .moveTo(50, doc.y + 1)
    // .lineTo(550, doc.y + 1)
    // .stroke();

    doc.text(note.content);
    doc.pipe(res);
    doc.end();
    // res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.showNote = async (req, res, next) => {
  const { noteId } = req.params;
  console.log(noteId + "herere1");

  try {
    let note = await Note.getNote(noteId);
    if (note.rowCount != 1) return res.redirect("/");
    note = note.rows[0];

    if (note.user_id != req.session.userId)
      throw new Error("not authenticated");
    console.log(note); /////////////////////////////////

    // const { title, content } = note;
    // const extractedDate = new Date().toLocaleString();
    // console.log(extractedDate);

    // res.send(note);
    res.render("notes/showNote", { title: "note", note });
    // res.redirect("/");
  } catch (err) {
    next(err);
  }
};

exports.getEdit = async (req, res, next) => {
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
  } catch (error) {
    next(err);
  }
};

exports.postUpdate = async (req, res, next) => {
  console.log("here in update");

  const { title, content } = req.body;
  const { noteId } = req.params;
  console.log(title, content, noteId);
  const error = validationResult(req);
  if (!error.isEmpty()) {
    req.flash("error", error.array()[0].msg);
    return res.redirect("/edit/" + noteId);
  }
  try {
    await Note.updateNote(noteId, title, content);
    res.redirect("/show/" + noteId);
  } catch (error) {
    //
    next(err);
  }
  // res.send(title + content);
};
