const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");

router.get("/", async (req, res) => {
  try {
    const person = await Person.find();
    res.json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");
    res.status(500).json(response);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving data" });
  }
});

module.exports = router;
