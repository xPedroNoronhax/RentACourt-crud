const express = require("express");
const mongoose = require("mongoose");
const courtRoute = require("./routes/court.route");
const bodyParser = require("body-parser");

const app = express();

app.use(bodyParser.json());

app.use("/api/courts", courtRoute);

app.listen(3000, () => {
  console.log("is running");
});

mongoose
  .connect(
    "mongodb+srv://pedrohxn:oKfXm1TLqkYqOegF@pedrohxn.7xqijb8.mongodb.net/?retryWrites=true&w=majority&appName=pedrohxn"
  )
  .then(() => {
    console.log("connected to db");
  })
  .catch((err) => {
    console.error("connection failed", err);
  });
