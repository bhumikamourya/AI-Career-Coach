const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  saveResume,
  getResume
} = require("../controllers/resumeBuilderController");

router.post("/", protect, saveResume);
router.get("/", protect, getResume);

module.exports = router;