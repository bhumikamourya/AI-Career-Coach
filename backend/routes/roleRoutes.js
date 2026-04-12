const express = require("express");
const router = express.Router();
const Role = require("../models/Role");

// GET ALL ROLES
router.get("/", async (req, res) => {
  try {
    const roles = await Role.find().select("name");
    res.json(roles);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;