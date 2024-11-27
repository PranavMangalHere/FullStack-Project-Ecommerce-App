const express = require("express");
const router = express.Router();

// import {jwtAuthMiddleware} from "../middlewares/jwtAutMiddleware"

const {
  registerUser,
  loginUser,
} = require("../controllers/userController");

router.post("/register", registerUser);

router.post("/login", loginUser);
// router.post("/login",loginUser);


module.exports = router;
