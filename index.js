const express = require("express");
const mongoose = require("mongoose");
const BookSchema = require("./models/Book");

mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "BookStore",
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Mongodb connected");
  })
  .catch((err) => {
    console.log(err);
  });

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const books = await BookSchema.find();
  res.render("Books.ejs", { books: books });
});

app.get("/Books/:id", async (req, res) => {
  const filteredbook = await BookSchema.find({ _id: req.params.id });
  res.render("BookDetails.ejs", { book: filteredbook[0] });
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
