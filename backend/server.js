const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const middleware = require("./middlewares/middleware");
const { connectDb } = require("./middlewares/db");
const Contact = require("./models/contact");
const subscriptionRoutes = require("./routes/subscription");
const User = require("./models/user");
const { registerUser } = require("./controllers/userController");

require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 5000;

connectDb();

middleware(app);

app.use('/api/user',require("./routes/userRoutes"))

app.use("/api/subscribe", subscriptionRoutes);

app.post("/api/contact", async (req, res) => {
  const { name, email, message } = req.body;
  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    console.log("Received contact form submission:", { name, email, message });
    res.status(200).json({ message: "Form submitted successfully!" });
  } catch (error) {
    console.error("Error saving contact form submission:", error);
    res.status(500).json({ message: "Error saving form submission" });
  }
});

app.post("/signup", async (req, res) => {
  try {
    const { username, email, phone, password } = req.body;

    if (!username || !email || !phone || !password) {
      return res
        .status(400)
        .json({ success: false, errors: "All fields are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid email format" });
    }

    if (password.length < 8) {
      return res.status(400).json({
        success: false,
        errors: "Password must be at least 8 characters",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, errors: "Email already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      phone,
      password: hashedPassword,
    });

    await newUser.save();

    res.status(201).json({ success: true });
  } catch (error) {
    console.error("Signup error:", error);
    res
      .status(500)
      .json({ success: false, errors: "Server error during signup" });
  }
});

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, errors: "Email and password are required" });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .json({ success: false, errors: "Invalid email format" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, errors: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, errors: "Invalid email or password" });
    }

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });

    res.status(200).json({ success: true, token });
  } catch (error) {
    console.error("Login error:", error);
    res
      .status(500)
      .json({ success: false, errors: "Server error during login" });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

module.exports = app;
