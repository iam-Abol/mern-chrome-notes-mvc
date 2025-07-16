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

router.get("/:noteId", authMiddleware, noteController.showNote);
module.exports = router;
