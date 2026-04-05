const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const { analyzeSkillGap } = require("../controllers/skillGapController");

router.get("/", protect, analyzeSkillGap);

module.exports = router;