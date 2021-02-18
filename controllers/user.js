const User = require("../models/user");

exports.getUserForEdit = async (req, res, next) => {
  const userId = req.userId;
  const username = req.params.username;
  try {
    const user = await User.findOne({
      where: {
        username: username,
      },
    });
    if (!user) {
      // return res.json({ message: "USER NOT REGISTERED, CONSIDER REGISTER" });
      const error = new Error("ERROR GETTING THE USER");
      error.statusCode = 401;
      throw error;
    }
    res.status(201).json({ username: user.username });
  } catch (error) {
    next(error);
  }
};

exports.postEditUser = async (req, res, next) => {
  const { username } = req.body;
  try {
    let user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    if (!user) {
      const error = new Error("CONSIDER LOGIN/RELOGIN");
      error.statusCode = 401;
      throw error;
    }
    user.username = username;
    const savedUser = await user.save();
    if (!savedUser) {
      const error = new Error("USER COULD NOT BE UPDATED");
      error.statusCode = 401;
      throw error;
    }
    res.status(200).json({ message: "USER UPDATED SUCCESSFULLY" });
  } catch (error) {
    next(error);
  }
};

exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findOne({
      where: {
        id: req.userId,
      },
    });
    const destroyedUser = await user.destroy();
    if (!destroyedUser) {
      const error = new Error("USER COULD NOT BE DELETED");
      error.statusCode = 401;
      throw error;
    }   
    res.status(200).json({ message: "USER DELETED SUCCESSFULLY" });
  } catch (error) {
    next(error);
  }
};
