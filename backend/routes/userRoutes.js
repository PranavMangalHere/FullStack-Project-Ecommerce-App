const express = require("express");
const router = express.Router();

// import {jwtAuthMiddleware} from "../middlewares/jwtAutMiddleware"

const {
  registerUser,
  loginUser,
  getUserProfile,
  updateUserProfile,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);
// router.post("/login",loginUser);


module.exports = router;
