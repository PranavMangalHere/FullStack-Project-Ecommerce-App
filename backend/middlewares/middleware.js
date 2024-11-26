const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const middleware = (app) => {
  app.use(
    cors({
      origin: ["http://localhost:5000", "http://localhost:5173"], 
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    })
  );
  app.use(bodyParser.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).json({ error: "Something went wrong!" });
  });
};

module.exports = middleware;
