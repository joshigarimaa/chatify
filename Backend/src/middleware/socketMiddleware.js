const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const cookie = require("cookie");
const env = require("../lib/env");

const socketAuthMiddleware = async (socket, next) => {
  try {
    // Parse cookies safely
    const cookies = cookie.parse(socket.handshake.headers.cookie || "");
    const token = cookies.jwt;

    if (!token) {
      return next(new Error("Unauthorized - No token provided"));
    }

    const decoded = jwt.verify(token, env.JWT_SECRET);

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) {
      return next(new Error("User not found"));
    }

    // Attach user to socket
    socket.user = user;
    socket.userId = user._id.toString();

    next();
  } catch (error) {
    console.error("Socket auth error:", error.message);
    next(new Error("Unauthorized - Authentication failed"));
  }
};

module.exports = socketAuthMiddleware;
