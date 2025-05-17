const mongoose = require("mongoose");

const LibrarySchema = new mongoose.Schema({
  title: String,
  author: String,
  status: { type: String, default: "available" }, // available, borrowed, reserved
  borrowerName: String,
  borrowDate: Date,
  dueDate: Date,
  returnDate: Date,
  overdueFees: { type: Number, default: 0 },
});

const Library = mongoose.model("Library", LibrarySchema);
module.exports = Library;
