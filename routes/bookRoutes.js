const express = require("express");
const {
  createBook,
  updateBook,
  deleteBook,
  getBooks,
  getBookById,
} = require("../controller/bookContoller");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/", auth, getBooks);
router.get("/:id", auth, getBookById);
router.post("/", auth, authorize("author"), createBook);
router.put("/:id", auth, authorize("author"), updateBook);
router.delete("/:id", auth, authorize("author"), deleteBook);

module.exports = router;
