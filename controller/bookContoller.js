const Book = require("../model/book");

async function createBook(req, res) {
  try {
    const { title, description, content, category, status } = req.body;
    if (!title || !category) {
      return res.status(400).json({ message: "Title and category are required" });
    }

    const book = await Book.create({
      title,
      description,
      content,
      category,
      status: status === "published" ? "published" : "draft",
      author: req.user.id,
    });

    return res.status(201).json(book);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

async function updateBook(req, res) {
  try {
    const { id } = req.params;
    const updates = req.body;
    const book = await Book.findById(id);
    if (!book) return res.status(404).json({ message: "Book not found" });

    if (String(book.author) !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }

    const allowed = ["title", "description", "content", "category", "status"];
    allowed.forEach((field) => {
      if (field in updates) {
        book[field] = updates[field];
      }
    });

    await book.save();
    return res.json(book);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

async function deleteBook(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }
    if (String(book.author) !== req.user.id) {
      return res.status(403).json({ message: "Not allowed" });
    }
    await book.deleteOne();
    return res.json({ message: "Book deleted" });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
}
async function getBooks(req, res) {
  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }
    if (req.query.status) {
      filter.status = req.query.status;
    }
    if (!req.user || req.user.role === "reader") {
      filter.status = "published";
    }

    const books = await Book.find(filter).sort({ createdAt: -1 });
    return res.json(books);
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}
async function getBookById(req, res) {
  try {
    const { id } = req.params;
    const book = await Book.findById(id);
    if (!book) {
      return res.status(404).json({ message: "Book not found" });
    }

    if (
      book.status !== "published" &&
      (!req.user || req.user.id !== String(book.author))
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }

    return res.json(book);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  createBook,
  updateBook,
  deleteBook,
  getBooks,
  getBookById,
};
