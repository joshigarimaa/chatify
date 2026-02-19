const express = require("express");
const {
  getAllContacts,
  getMessagesByUserId,
  sendMessage,
  getChatPartners,
} = require("../controllers/messageController");

const { protectRoute } = require("../middleware/authMiddleware");
const arcjetProtection = require("../middleware/arcjetMiddleware");

const router = express.Router();

// Apply global middlewares to all routes
router.use(arcjetProtection, protectRoute);

router.get("/contacts", getAllContacts);
router.get("/chats", getChatPartners);
router.get("/:id", getMessagesByUserId);
router.post("/send/:id", sendMessage);

module.exports = router;
