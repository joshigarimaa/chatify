const express = require("express");
const {
  signUp,
  login,
  logout,
  updateProfile,
} = require("../controllers/authController");
const { protectRoute } = require("../middleware/authMiddleware");
const arcjetProtection = require("../middleware/arcjetMiddleware");

const router = express.Router();
router.use(arcjetProtection);

router.post("/signup", arcjetProtection, signUp);
router.post("/login", arcjetProtection, login);
router.post("/logout", arcjetProtection, logout);
router.put("/update-profile", arcjetProtection, protectRoute, updateProfile);

router.get("/check", arcjetProtection, protectRoute, (req, res) => {
  res.status(200).json({
    user: req.user,
  });
});

module.exports = router;
