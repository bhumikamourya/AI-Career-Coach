const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  getProfile,
  updateProfile,
  deleteSkill,
  updatePassword
} = require("../controllers/userController");

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/skill/:name", protect, deleteSkill);
router.put("/update-password", protect, updatePassword);

module.exports = router;