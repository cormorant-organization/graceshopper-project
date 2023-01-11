//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Puppy = require("./models/Puppy");

//associations could go here!

module.exports = {
  db,
  models: {
    User,
    Puppy,
  },
};
