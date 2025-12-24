const express = require("express");
const {
  createCategory,
  getCategories,
  updateCategory,
  deleteCategory,
} = require("../controller/categoryController");
const { auth, authorize } = require("../middleware/auth");

const router = express.Router();

router.get("/", getCategories);
router.post("/", auth, authorize("author"), createCategory);
router.put("/:id", auth, authorize("author"), updateCategory);
router.delete("/:id", auth, authorize("author"), deleteCategory);

module.exports = router;
