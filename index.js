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
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.get("/", async (req, res) => {
  const books = await BookSchema.find();
  res.render("Books.ejs", { books: books });
});

app.get("/Books/:id", async (req, res) => {
  const filteredbook = await BookSchema.find({ _id: req.params.id });
  res.render("BookDetails.ejs", { book: filteredbook[0] });
});

app.get("/add-book", (req, res) => {
  res.render("addBook.ejs");
});

app.post("/add-data", (req, res) => {
  BookSchema.insertMany(req.body);
  res.redirect("/");
});

app.get("/books/:id/edit", async (req, res) => {
  const filteredbook = await BookSchema.find({ _id: req.params.id });
  res.render("editBook.ejs", { book: filteredbook[0] });
});

app.post("/books/:id/upate-data", (req, res) => {
  BookSchema.updateOne({ _id: req.params.id }, req.body)
    .then(() => {
      console.log("Updated successfully");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
});

app.post("/books/:id/method=DELETE", async (req, res) => {
  BookSchema.deleteOne({ _id: req.params.id })
    .then(() => {
      console.log("Deleted successfully");
    })
    .catch((err) => {
      console.log(err);
    });
  res.redirect("/");
});

app.get("/about", (req, res) => {
  res.render("about.ejs");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
