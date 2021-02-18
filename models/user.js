const Sequalize = require("sequelize");

const sequelize = require("../utils/database");

const User = sequelize.define("user", {
  id: {
    type: Sequalize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  username: {
    allowNull: false,
    type: Sequalize.STRING,
  },
  password: {
    allowNull: false,
    type: Sequalize.STRING,
  },
});

module.exports = User;
