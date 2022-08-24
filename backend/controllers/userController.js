const asynHandler = require("express-async-handler");
const User = require("../models/userModel");
const { genToken } = require("../utils/generateToken");

const authUser = asynHandler(async (req, res) => {
  const enteredEmail = req.body.email;
  const enteredPassword = req.body.password;

  const user = await User.findOne({ email: enteredEmail });

  if (user && (await user.matchPasswords(enteredPassword))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
});

const registerUser = asynHandler(async (req, res) => {
  const { name, email, password } = req.body;
  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(400);
    throw new Error("User exist");
  }
  const user = await User.create({ name, email, password });
  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: genToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid User");
  }
});

const getUserProfile = asynHandler(async (req, res) => {
  res.send(req.user);
});

module.exports = { authUser, getUserProfile, registerUser };
