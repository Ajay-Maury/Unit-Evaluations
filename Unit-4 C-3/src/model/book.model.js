const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema(
  {
    likes: { type: Number, default: 0 },
    coverImage: { type: String, required: true },
    content: { type: String, required: true },
    authorId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    publicationId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "publication",
      required: true,
    },
    commentId: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: "comment",
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

const Book = mongoose.model("book", bookSchema);

module.exports = Book;
