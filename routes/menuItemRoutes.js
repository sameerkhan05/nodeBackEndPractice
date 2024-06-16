const express = require("express");
const router = express.Router();
const MenuItem = require("./../models/Menu");

router.get("/", async (req, res) => {
  try {
    const menuItems = await MenuItem.find();
    res.json(menuItems);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("menu item saved");
    res.status(200).json(response);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Error saving menu item" });
  }
});

module.exports = router;
