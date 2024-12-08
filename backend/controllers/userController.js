const asyncHandler = require("express-async-handler");
const bcrypt = require("bcrypt");
const User = require("../models/user");
require("dotenv").config();
const jwt = require("jsonwebtoken");

// Register user
const registerUser = asyncHandler(async (req, res) => {
  const { username, email, phone, password } = req.body;

  // Validate required fields
  if (!username || !email || !phone || !password) {
    res.status(400);
    throw new Error("Please enter all the details");
  }

  // Check if user already exists
  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({ message: "User already exists" });
  }

  // Hash the password
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(password, salt);

  // Create a new user
  const newUser = await User.create({
    username,
    email,
    phone,
    password: hashedPassword,
  });

  // Send success response
  res.status(201).json({
    message: "User registered successfully",
    user: {
      username: newUser.username,
      email: newUser.email,
      phone: newUser.phone,
    },
  });
});

// Login user
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

  // Generate JWT token
  const token = jwt.sign(
    { id: user._id, email: user.email },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  // Send successful login response with token and user data
  res.status(200).json({
    message: "Login successful",
    token, // Fixed typo here
    user: {
      username: user.username,
      email: user.email,
      phone: user.phone,
    },
  });
});

module.exports = { registerUser, loginUser };
