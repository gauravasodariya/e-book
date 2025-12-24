const Comment = require("../model/comment");

async function createComment(req, res) {
  try {
    const { bookId, userId, text } = req.body;
    if (!bookId || !userId || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }
    const comment = await Comment.create({ bookId, userId, text });
    return res.status(201).json(comment);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

async function getComments(req, res) {
  try {
    const { bookId } = req.params;
    const comments = await Comment.find({ bookId });
    return res.json(comments);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

async function updateComment(req, res) {
  try {
    const { id } = req.params;
    const { text } = req.body;
    const comment = await Comment.findByIdAndUpdate(id,{ text },{ new: true });
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.json(comment);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

async function deleteComment(req, res) {
  try {
    const { id } = req.params;
    const comment = await Comment.findByIdAndDelete(id);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    return res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createComment,
  getComments,
  updateComment,
  deleteComment,
};
