const Sequelize = require("sequelize");
require("dotenv").config();

const sequelize = new Sequelize(
  process.env.MYSQL_DB,
  process.env.MYSQL_USER,
  process.env.MYSQL_PASSWORD,
  {
    dialect: "mysql",
    host: "localhost",
  }
);

// const print = async() => {
//     try {
//         await sequelize.authenticate();
//         console.log("Connection successfully");
//       } catch (error) {
//         console.log(error);
//       }
// }
// print();
module.exports = sequelize;
