const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/Image_Database");

const db = mongoose.connection;
db.on("error", console.error.bind("error in connection"));
db.once("open", function (err) {
  if (err) {
    console.log("Error in connecting to the database");
    return;
  }
  console.log("Successfully connected to the database");
});

module.exports = db;
