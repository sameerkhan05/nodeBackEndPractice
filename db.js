const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/hotels", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to Mongodb");
});

db.on("disconnected", () => {
  console.log("disconnected to Mongodb");
});

module.exports = db;
