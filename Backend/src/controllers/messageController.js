const messageModel = require("../models/Message");
const userModel = require("../models/userModel");
const cloudinary = require("../lib/cloudinary");
const { io, getRecieverSocketId } = require("../lib/socket");

// ===============================
// 🔹 GET ALL CONTACTS
// ===============================
const getAllContacts = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const loggedInUserId = req.user._id;

    const filteredUsers = await userModel
      .find({ _id: { $ne: loggedInUserId } })
      .select("-password");

    return res.status(200).json(filteredUsers);
  } catch (error) {
    console.log("Error in getAllContacts:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// 🔹 GET MESSAGES BETWEEN USERS
// ===============================
const getMessagesByUserId = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const myId = req.user._id;
    const { id: userToChatId } = req.params;

    if (!userToChatId) {
      return res.status(400).json({ message: "User ID is required" });
    }

    const messages = await messageModel
      .find({
        $or: [
          { senderId: myId, receiverId: userToChatId },
          { senderId: userToChatId, receiverId: myId },
        ],
      })
      .sort({ createdAt: 1 });

    return res.status(200).json(messages);
  } catch (error) {
    console.log("Error in getMessagesByUserId:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// 🔹 SEND MESSAGE
// ===============================
const sendMessage = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const { text, image } = req.body;
    const { id: receiverId } = req.params;
    const senderId = req.user._id;

    if (!receiverId) {
      return res.status(400).json({ message: "Receiver ID is required" });
    }

    let imageUrl = null;

    // Upload image only if provided
    if (image) {
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }

    const newMessage = await messageModel.create({
      senderId,
      receiverId,
      text,
      image: imageUrl,
    });

    // 🔥 Real-time emit
    const receiverSocketIds = getRecieverSocketId(receiverId);

    if (receiverSocketIds) {
      receiverSocketIds.forEach((socketId) => {
        io.to(socketId).emit("receiveMessage", newMessage);
      });
    }

    return res.status(201).json(newMessage);
  } catch (error) {
    console.log("Error in sendMessage:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

// ===============================
// 🔹 GET CHAT PARTNERS
// ===============================
const getChatPartners = async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const myId = req.user._id;

    const messages = await messageModel.find({
      $or: [{ senderId: myId }, { receiverId: myId }],
    });

    const partnerIds = new Set();

    messages.forEach((msg) => {
      if (msg.senderId.toString() !== myId.toString()) {
        partnerIds.add(msg.senderId.toString());
      }
      if (msg.receiverId.toString() !== myId.toString()) {
        partnerIds.add(msg.receiverId.toString());
      }
    });

    const partners = await userModel
      .find({ _id: { $in: Array.from(partnerIds) } })
      .select("-password");

    return res.status(200).json(partners);
  } catch (error) {
    console.log("Error in getChatPartners:", error.message);
    return res.status(500).json({ message: "Server Error" });
  }
};

module.exports = {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChatPartners,
};
