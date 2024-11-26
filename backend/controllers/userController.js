const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/userModel");
require("dotenv").config();

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, phoneNumber, password } = req.body;

  if (!username || !email || !phone || !password) {
    res.send(400);
    throw new Error("Pleas enter all the details");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.send(400).json({ message: "User already exists" });
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    phoneNumber,
    password: hashedPassword,
  });
  res
    .status(201)
    .json({ message: "user registered successfully ", user: newUser });
});

const loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Validate email and password
  if (!email || !password) {
    return res
      .status(400)
      .json({ message: "Please provide both email and password" });
  }

  // Find the user by email
  const user = await User.findOne({ email });
  if (!user) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Check if the password matches (using bcrypt to compare hashed passwords)
  const passwordMatch = await bcrypt.compare(password, user.password);
  if (!passwordMatch) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // If login is successful, send a response (no token, just user details)
  res.status(200).json({
    message: "Login successful",
    user: {
      username:user.username,
      email: user.email,
      phoneNumber: user.phoneNumber,
    },
  });
});

const getUserProfile = asyncHandler(async (req, res) => {
  const email = req.body;
  const data = await User.findOne({ email });
  if (!data) {
    return res.status(404).send({ err: "not found" });
  } else {
    return res.status(200).send(data);
  }
});

const updateUserProfile = asyncHandler(async (req, res) => {
  const { email, updates } = req.body;

  if (!email || !updates) {
    return res.status(400).send({ err: "data is incomplete" });
  }

  const userdata = await User.findOne({ email });
  if (!userdata) {
    return res.status(404).send({ message: "not found" });
  }
});

module.exports = { registerUser, loginUser };
