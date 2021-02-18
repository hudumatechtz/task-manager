const express = require("express");
const app = express();
const sequelize = require("./utils/database");
require("dotenv").config();

const authRoute = require("./routes/auth-route");
const userRoute = require("./routes/user-route");
const taskRoute = require("./routes/task-route");

const User = require("./models/user");
const Task = require("./models/task");

const PORT = process.env.PORT || 5000;
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Content-Type, X-Requested-With, Authorization"
  );
  // res.setHeader('Access-Control-Allow-Credentials', true)
  next();
});

app.use("/account", authRoute);
app.use(userRoute);
// app.use(taskRoute);

app.use("/", (req, res, next) => {
  res.status(200).json({ api: "Welcome to TaskManager Backend" });
  next();
});
app.use((err, req, res, next) => {
  const status = err.statusCode || 500;
  const message = err._message ? err._message : err.message;
  const notSuccess = err.notSuccess ? err.notSuccess : false;
  if (err != null) {
    res.status(status).json({ message: message, notSuccess: notSuccess });
  }
  // DISPLAY ERROR MESSAGE DURING DEVELOPMENT
  console.log(err);
  next();
});

Task.belongsTo(User, {
  constraints: true,
  onDelete: "CASCADE",
});
User.hasMany(Task);
sequelize
  .sync()
  .then((result) => {
    // console.log(result);
    app.listen(PORT, (err) => {
      if (err) {
        return console.log(err);
      }
      console.log("TASK MANAGER up and running at PORT:", PORT);
    });
  })
  .catch((err) => console.log(err));
