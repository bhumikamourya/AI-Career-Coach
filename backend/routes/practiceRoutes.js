const express = require("express");
const router = express.Router();

const protect = require("../middlewares/authMiddleware");
const {
  getQuestions,
  submitAnswers
} = require("../controllers/practiceController");

router.get("/", protect, getQuestions);
router.post("/submit", protect, submitAnswers);

module.exports = router;