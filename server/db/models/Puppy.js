const Sequelize = require("sequelize");
const db = require("../db");

const Puppy = db.define("puppy", {
  name: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  breed: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  color: {
    type: Sequelize.STRING,
    allowNull: false,
  },
  age: {
    type: Sequelize.INTEGER,
    allowNull: false,
  },
  description: {
    type: Sequelize.TEXT,
    allowNull: false,
  },
  photoURL: {
    type: Sequelize.STRING,
    validate: {
      isUrl: true,
    },
    allowNull: false,
  },
  price: {
    type: Sequelize.DECIMAL(3, 2),
    allowNull: false,
  },
});

module.exports = Puppy;
