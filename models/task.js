const Sequelize = require("sequelize");

const sequelize = require("../utils/database");

const Task = sequelize.define("task", {
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  },
  task: Sequelize.STRING,
  newTask: {
    type: Sequelize.BOOLEAN,
    defaultValue: true,
  },
  onGoing: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
  },
});
module.exports = Task;
