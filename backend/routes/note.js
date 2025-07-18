const express = require("express");
const authMiddleware = require("../middlewares/auth");
const router = express.Router();
const Note = require("../models/note");
const noteController = require("../controllers/note");

const { body } = require("express-validator");

router.get("/", authMiddleware, noteController.getIndex);
router.post(
  "/",
  authMiddleware,
  [
    body("title")
      .trim()
      .isLength({ min: 6 })
      .withMessage("title should be atleast 6 characters"),
    body("content").not().isEmpty().withMessage("note cant be empty"),
  ],
  noteController.postIndex
);
router.get("/create", authMiddleware, noteController.getCreate);
router.post("/delete/:noteId", authMiddleware, noteController.deleteNote);

router.post("/pdf/:noteId", authMiddleware, noteController.getPdf);

router.get("/show/:noteId", authMiddleware, noteController.showNote);
router.get("/edit/:noteId", authMiddleware, noteController.getEdit);

router.post("/update/:noteId", authMiddleware, noteController.postUpdate);
module.exports = router;
