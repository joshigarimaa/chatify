const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.send("User signed up successfully");
});

router.get("/login", (req, res) => {
  res.send("User logged in successfully");
});

module.exports = router;
