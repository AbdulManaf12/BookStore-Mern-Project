const express = require("express");
const multer = require("multer");

const app = express();
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const upload = multer({
  storage: multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "uploads");
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + "-" + Date.now() + ".jpg");
    },
  }),
}).single("file");

app.post("/upload_file", upload, (req, res) => {
  res.send("File uploaded successfully");
});

app.listen(3000, () => {
  console.log("Server running on port 3000");
});
