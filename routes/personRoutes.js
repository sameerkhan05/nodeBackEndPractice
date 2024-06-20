const express = require("express");
const router = express.Router();
const Person = require("./../models/Person");
const { jwtAuthMiddleware, generateToken } = require("./../jwt");

router.get("/",jwtAuthMiddleware, async (req, res) => {
  try {
    const person = await Person.find();
    res.json(person);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

//Login Route
router.post("/login", async (req, res) => {
  try {
    //Extract username and pass from body
    const { username, password } = req.body;

    //finding user
    const user = await Person.findOne({ username: username });

    //If user donst match or wrong pass
    if (!user || !(await user.comparePassword(password))) {
      return res.status(401).json({ message: "Invalid Credentials" });
    }
    // Genrate tokem
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generateToken(payload);
    res.json({ token: token });
  } catch (err) {
    res.status(500).json({ message: "Internal Error" });
  }
});

router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newPerson = new Person(data);
    const response = await newPerson.save();
    console.log("data saved");

    const payload = {
      id: response.username,
    };

    const token = generateToken(payload);
    console.log(payload);
    console.log("token", token);

    res.status(500).json({ response: response, token: token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error saving data" });
  }
});

module.exports = router;
