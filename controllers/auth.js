const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
// const { json } = require("sequelize/types");

//HELPER METHODS
const validatorHelper = (password, hashedPassword, callbak) => {
  bcrypt
    .compare(password, hashedPassword)
    .then((doMatch) => {
      if (doMatch) {
        return callbak(doMatch);
      }
      return callbak(doMatch);
    })
    .catch((error) => {
      // console.log(error);
      console.log(error);
      return callback(false);
    });
};

exports.postRegister = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const hashedPassword = await bcrypt.hash(password, 12);
    const savedUser = await User.create({
      username: username,
      password: hashedPassword,
    });
    if (!savedUser) {
      return res.json({
        message: "USER REGISTRATION FAILED",
        registration: false,
      });
    }
    res.json({ message: "USER REGISTERED", registration: true });
  } catch (error) {
    next(error);
  }
};
exports.postLogin = async (req, res, next) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      // return res.json({ message: "USER NOT REGISTERED, CONSIDER REGISTER" });
      const error = new Error("USER NOT REGISTERED, CONSIDER REGISTER");
      error.statusCode = 401;
      throw error;
    }
    validatorHelper(password, user.password, (doMatch) => {
      if (!doMatch) {
        return res.status(200).json({
          message: "EITHER USERNAME OR PASSWORD INCORRECT",
          isLoggedIn: false,
        });
      }
      const token = jwt.sign(
        {
          username: username,
          userId: user.id,
        },
        "secure_user",
        {
          expiresIn: "1hr",
        }
      );
      res.status(201).json({
        success: true,
        token: token,
        isLoggedIn: true,
        expiresIn: 3600,
        username: user.username,
        userId: user.id,
      });
    });
  } catch (error) {
    next(error);
  }
};
