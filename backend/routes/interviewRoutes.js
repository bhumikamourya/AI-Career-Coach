const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

// ❌ protect hata diya (temporary fix)
const {
  startInterview,
  submitInterviewAnswers,
  evaluateInterview
} = require("../controllers/interviewController");

// Routes
router.post("/start",protect, startInterview);
router.post("/submit",protect, submitInterviewAnswers);
router.post("/evaluate",protect, evaluateInterview);

module.exports = router;