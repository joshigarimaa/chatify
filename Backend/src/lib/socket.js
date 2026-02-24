const { Server } = require("socket.io");
const http = require("http");
const express = require("express");
const env = require("./env");
const socketAuthMiddleware = require("../middleware/socketMiddleware");

const app = express();
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: env.CLIENT_URL,
    credentials: true,
  },
});

io.use(socketAuthMiddleware);

const userSocketMap = new Map();

io.on("connection", (socket) => {
  console.log("User connected:", socket.user.fullName);

  const userId = socket.userId;

  if (!userSocketMap.has(userId)) {
    userSocketMap.set(userId, new Set());
  }

  userSocketMap.get(userId).add(socket.id);

  io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));

  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.user.fullName);

    const userSockets = userSocketMap.get(userId);

    if (userSockets) {
      userSockets.delete(socket.id);

      if (userSockets.size === 0) {
        userSocketMap.delete(userId);
      }
    }

    io.emit("getOnlineUsers", Array.from(userSocketMap.keys()));
  });
});

// ✅ EXPORT THESE
module.exports = { app, server, io };s