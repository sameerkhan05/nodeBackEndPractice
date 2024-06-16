const express = require("express");
const app = express();
const db = require("./db");
const bodyParser = require("body-parser");

require("dotenv").config();

app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

//middele ware
const logRequest = (req, res, next) => {
  console.log(
    `[${new Date().toLocaleString()}] RequestMade : ${req.originalUrl}`
  );
  next();
};

app.use(logRequest);

app.get("/", function (req, res) {
  res.send("Welcome to Hotel....");
});

//Import routes
const personRoute = require("./routes/personRoutes");
const menuRoute = require("./routes/menuItemRoutes");
//Use routes
app.use("/person", personRoute);
app.use("/menu", menuRoute);
//start server

app.listen(3000, () => {
  console.log("Server listening Port on : 3000");
});
