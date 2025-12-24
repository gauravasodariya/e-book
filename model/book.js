const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    title: { 
      type: String, 
      required: true, 
     },
    description: { 
      type: String
    },
    content: { 
      type: String, trim: true },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    status: { 
      type: String,
       enum: ["draft", "published"],
      default: "draft" 
    },
    ratingsCount: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Book", bookSchema);
