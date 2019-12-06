const express = require("express");
const bodyParser = require("body-parser");
const students = require("./routes/routes.js");
const mongoose = require("mongoose");
const app = express();

//sets template engine
app.set("view engine", "pug");
//sets directory name
app.set("views", "./views");
app.use(express.static("static"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/", students);

app.listen(80, err => {
  if (err) console.error(err);
  mongoose
    .connect("mongodb://localhost:27017/assessment", {
      useNewUrlParser: true,
      useUnifiedTopology: true
    })
    .then(() => console.info("Now connected to MongoDB!"))
    .then(() => console.info("Server listening port: 80"));
});
