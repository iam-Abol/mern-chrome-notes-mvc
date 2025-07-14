const db = require("../db");

exports.getNotes = (userId) => {
  return db.query("select * from notes where user_id = $1", [userId]);
};
exports.createNote = (title, content, id) => {
  return db.query(
    "insert into notes (title,content,user_id) values ($1,$2,$3) returning *",
    [title, content, id]
  );
};
exports.getNote = (noteId) => {
  return db.query("select * from notes where id = $1", [noteId]);
};
exports.deleteNote = (noteId) => {
  return db.query("delete from notes where id= $1", [noteId]);
};
