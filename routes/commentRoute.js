const express = require("express");
const { auth } = require("../middleware/auth");
const commentController = require("../controller/commentController");

const router = express.Router();

router.get("/:id", auth, commentController.readComment);
router.post("/", auth, commentController.addComment);
router.put("/:id", auth, commentController.updateComment);
router.delete("/:id", auth, commentController.deleteComment);

module.exports = router;
