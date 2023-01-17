const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  closed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});

module.exports = Order;
