const express = require("express");
const cors = require("cors");
require("dotenv").config();
const authRoute = require("./src/routes/authRoute");
const messageRoute = require("./src/routes/messageRoute");
const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test Route
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

// Port Fix
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
