const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const personSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
  },
  work: {
    type: String,
    enum: ["chef", "waiter", "manager"],
    required: true,
  },
  mobile: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    unique: true,
  },
  address: {
    type: String,
  },
  salary: {
    type: Number,
    require: true,
  },
  username: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

personSchema.pre("save", async function (next) {
  const person = this;
  if (!person.isModified("password")) return next();
  try {
    //Hash password genrate
    const salt = await bcrypt.genSalt(10);

    //hash pass
    const hashPassword = await bcrypt.hash(person.password, salt);
    person.password = hashPassword;

    next();
  } catch (err) {
    return next(err);
  }
});

personSchema.methods.comparePassword = async function (candidatePassword) {
  try {
    const isMatch = await bcrypt.compare(candidatePassword, this.password);
    return isMatch;
  } catch {
    throw err;
  }
};

// create person model
const Person = mongoose.model("Person", personSchema);
module.exports = Person;
