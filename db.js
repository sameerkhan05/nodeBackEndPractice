const mongoose = require("mongoose");
require("dotenv").config();

const MongoURL = process.env.MONGODB_URL;

mongoose.connect(
  "mongodb+srv://sameerKhan01:samSAM@cluster0.lgodr8g.mongodb.net/",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

const db = mongoose.connection;

db.on("connected", () => {
  console.log("connected to Mongodb");
});

db.on("disconnected", () => {
  console.log("disconnected to Mongodb");
});

module.exports = db;
