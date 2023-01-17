//this is the access point for all things database related!

const db = require("./db");

const User = require("./models/User");
const Puppy = require("./models/Puppy");
const Order = require("./models/Order");
const Session = require("./models/Session");

//associations could go here!
User.hasMany(Order);
Order.belongsTo(User);
Order.hasMany(Session);
Session.belongsTo(Order);
Puppy.hasMany(Session);
Session.belongsTo(Puppy);

module.exports = {
  db,
  models: {
    User,
    Puppy,
  },
};
