const Note = require("../models/note");
exports.getIndex = async (req, res, next) => {
  try {
    let notes = await Note.getNotes(req.session.userId);
    notes = notes.rows;
    // console.log(notes);

    res.render("notes/index", { title: "HOME", notes });
  } catch (err) {
    console.log(err);
    res.send(err);
  }
};
exports.postIndex = async (req, res, next) => {
  const { title, content } = req.body;
  try {
    const note = await Note.createNote(title, content, req.session.userId);
    console.log(note);
    res.redirect("/");
  } catch (err) {
    res.send(err);
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
    console.log(err);
    res.send(err);
  }
};
