const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  name: String,
  author: String,
  edition: Number,
  description: String,
  price: Number,
  availability: Boolean,
});

module.exports = mongoose.model("books", BookSchema);
