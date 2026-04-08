const express = require("express");
const router = express.Router();

const { updateProgress } = require("../controllers/progressController");
const protect = require("../middlewares/authMiddleware");;

router.post("/complete", protect, updateProgress);

module.exports = router;