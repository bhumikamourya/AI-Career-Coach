const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  getProfile,
  updateProfile,
  deleteSkill,
  getDashboardData
} = require("../controllers/userController");

router.get("/profile", protect, getProfile);
router.put("/profile", protect, updateProfile);
router.delete("/skill/:name", protect, deleteSkill);
router.get("/dashboard", protect, getDashboardData);
module.exports = router;