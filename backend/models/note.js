const db = require("../db");

exports.getNotes = () => {
  return db.query("select * from notes");
};
exports.createNote = (title, content, id) => {
  return db.query(
    "insert into notes (title,content,user_id) values ($1,$2,$3) returning *",
    [title, content, id]
  );
};
