const db = require("../db");

exports.getNotes = () => {
  return db.query("select * from notes");
};
