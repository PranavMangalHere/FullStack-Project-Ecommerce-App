const express = require("express");
const nodemailer = require("nodemailer");
const router = express.Router();
require("dotenv").config();

// Configure Nodemailer
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// POST route to send order confirmation email
router.post("/", async (req, res) => {
  const { email, orderNumber, totalAmount, items } = req.body;

  if (!email || !orderNumber || !totalAmount || !items) {
    return res.status(400).json({ message: "All fields are required." });
  }

  const itemList = items
    .map((item) => `<li>${item.name} - $${item.price}</li>`)
    .join("");

  const mailOptions = {
    from: `"ZOOSKO" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: "Order Confirmation",
    html: `
      <h1>Thank you for your order!</h1>
      <p>Your order number is: <strong>${orderNumber}</strong></p>
      <p>Total Amount: <strong>$${totalAmount}</strong></p>
      <h2>Items:</h2>
      <ul>${itemList}</ul>
      <p>We appreciate your business!</p>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Order confirmation email sent to:", email);
    res.status(200).json({ message: "Confirmation email sent." });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ message: "Error sending confirmation email." });
  }
});

module.exports = router;
