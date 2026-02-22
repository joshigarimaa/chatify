const express = require("express");
const cors = require("cors");
const path = require("path");
const ENV = require("./lib/env");
const authRoute = require("./routes/authRoute");
const messageRoute = require("./routes/messageRoute");
const connectDB = require("./lib/db");
const cookieParser = require("cookie-parser");

const app = express();

// Middlewares
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

// ✅ FIXED HERE (increase payload limit)
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ limit: "10mb", extended: true }));

// Routes
app.use("/api/auth", authRoute);
app.use("/api/message", messageRoute);

// Production Setup
if (ENV.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "../../Frontend/dist")));

  app.use((req, res) => {
    res.sendFile(path.join(__dirname, "../../Frontend/dist/index.html"));
  });
}

// Port
const PORT = ENV.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  connectDB();
});
