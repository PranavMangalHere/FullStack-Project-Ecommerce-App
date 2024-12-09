const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken")

const registerUser = asyncHandler(async (req, res) => {
  const { username, email, phone, password } = req.body;

  if (!username || !email || !phone || !password) {
    res.send(400);
    throw new Error("Please enter all the details");
  }

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  const newUser = await User.create({
    username,
    email,
    phone,
    password: hashedPassword,
  });
  res.status(201).json({ message: "user registered successfully ", user: newUser });
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

  //Generate jwt token

  // const token = jwt.sign(
  //   { id: user._id, email: user.email },
  //   process.env.JWT_SECRET,
  //   { expiresIn: "1h" }
  // );

  let token;
  try {
    token = jwt.sign(
      { id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
  } catch (error) {
    console.error("Error generating JWT:", error.message);
    return res.status(500).json({ message: "Token generation failed" });
  }

  // If login is successful, send a response (no token, just user details)
  res.status(200).json({
    message: "Login successful",
    token,
    user: {
      username:user.username,
      email: user.email,
      phone: user.phone,
    },
  });
});
module.exports = { registerUser, loginUser };
