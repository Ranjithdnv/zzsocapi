const express = require("express");

const app = express();

const cors = require("cors");
const multer = require("multer");
const bodyParser = require("body-parser");
const path = require("path");
app.use(
  cors("https://zzsoc.onrender.com")
  // "https://future-together.onrender.com"
);
app.use(express.json());
app.use(bodyParser.json());
app.use("/images", express.static(path.join(__dirname, "public/Images")));
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./public/Images");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const upload = multer({ storage });

app.post("/upload", upload.single("file"), (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.send(req.file.filename);
});
//
app.listen(3001, () => {
  console.log("Server is running");
});
