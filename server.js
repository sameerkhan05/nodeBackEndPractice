const express = require("express");
const app = express();
const db = require("./db");
const Person = require("./models/Person");
const bodyParser = require("body-parser");
const MenuItem = require("./models/Menu");

app.use(bodyParser.json());

app.get("/", function (req, res) {
  res.send("Welcome to Hotel....");
});


app.get("/person",async(req,res)=>{
  try{
    const person = await Person.find();
    res.json(person);
    }catch(err){
      res.status(500).json({message:err.message});
      }
})

app.get("/menu", async(req,res)=>{
  try{
    const menuItems = await MenuItem.find();
    res.json(menuItems);
    }catch(err){
      res.status(500).json({message:err.message});
      }
})


app.post("/person", async (req, res) => {
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

app.post("/menu", async (req,res) => {
  try {
    const data = req.body;
    const newMenuItem = new MenuItem(data);
    const response = await newMenuItem.save();
    console.log("menu item saved");
    res.status(200).json(response);
  }
  catch(err){
    console.log(err);
    res.status(500).json({message:"Error saving menu item"});
  }
})


app.listen(3000, () => {
  console.log("server is live");
});
