const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  getProfile,
  updateProfile,
  deleteSkill
} = require("../controllers/userController");

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/skill", protect, deleteSkill);

module.exports = router;