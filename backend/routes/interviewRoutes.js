const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const {
  startInterview,
  submitInterviewAnswers,
  getInterviewResult,
  getInterviewHistory
} = require("../controllers/interviewController");

router.post("/start", protect, startInterview);
router.post("/submit", protect, submitInterviewAnswers);
router.get("/result/:sessionId", protect, getInterviewResult);

router.get("/history", protect, getInterviewHistory);

module.exports = router;