const jwt = require("jsonwebtoken");

module.exports = async (req, res, next) => {
  const authHeader = req.get("Authorization");
  try {
    if (!authHeader) {
      const error = new Error("not authenticated, consider login");
      error.statusCode = 401;
      throw error;
    }
    const token = authHeader.split(" ")[1];
    const decodedToken = await jwt.verify(token, "secure_user");
    if (!decodedToken) {
      const error = new Error("Not  Authenticated");
      error.statusCode = 401;
      throw error;
    }
    req.userId = decodedToken.userId;
    req.username = decodedToken.username;
  } catch (error) {
    next(error);
  }
  next();
};
