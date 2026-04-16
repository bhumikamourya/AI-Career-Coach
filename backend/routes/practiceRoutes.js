const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const {
  getQuestions,
  submitAnswers,
  saveAnswer
} = require("../controllers/practiceController");

router.get("/", protect, getQuestions);
router.post("/submit", protect, submitAnswers);
router.post("/save", protect, saveAnswer);

module.exports = router;