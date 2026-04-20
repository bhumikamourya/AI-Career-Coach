const express = require("express");
const router = express.Router();
const protect = require("../middlewares/authMiddleware");

const { evaluate } = require("../controllers/interviewController");

router.post("/evaluate",protect, evaluate);

module.exports = router;