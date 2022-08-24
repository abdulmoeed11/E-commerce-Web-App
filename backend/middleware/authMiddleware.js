const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");

const protect = asyncHandler(async (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      let token = req.headers.authorization.split(" ")[1];
      let decoded = jwt.verify(token, process.env.JWT_SECRET);
      console.log(decoded);
      req.user = await User.findById(decoded.id).select("-password");
      if (req.user) {
        next();
      } else {
        res.status(404);
        throw new Error("User not found");
      }
    } catch (error) {
      console.error(error);
      res.status(401);
      throw new Error("not authorized, token failed");
    }
  } else {
    res.status(401);
    throw new Error("Not Authorized");
  }
});

module.exports = { protect };
