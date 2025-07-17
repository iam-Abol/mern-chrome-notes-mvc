const db = require("../db");

exports.getNotes = (userId, limit, offset) => {
  return db.query("select * from notes where user_id = $1 limit $2 offset $3", [
    userId,
    limit,
    offset,
  ]);
};

exports.getNotesCount = (userId) => {
  return db.query("select count(*) from notes where user_id= $1", [userId]);
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
exports.updateNote = (noteId, title, content) => {
  return db.query("update notes set title=$1 , content=$2 where id=$3", [
    title,
    content,
    noteId,
  ]);
};
exports.deleteNote = (noteId) => {
  return db.query("delete from notes where id= $1", [noteId]);
};
