const express = require("express");
const router = express.Router();
const upload = require("../middlewares/uploadMiddleware");
const protect = require("../middlewares/authMiddleware");

const { uploadResume } = require("../controllers/resumeController");

router.post("/", protect, upload.single("resume"), uploadResume);

module.exports = router;