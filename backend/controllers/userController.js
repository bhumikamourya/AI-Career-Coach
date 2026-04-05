const User = require("../models/User");

// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    let { targetRole, skills } = req.body;

    const updateData = {};

    //  handle role
    if (targetRole) {
      updateData.targetRole = targetRole;
    }

    //  handle skills safely
    if (skills && Array.isArray(skills)) {
      updateData.skills = skills.map((skill) => skill.trim());
    }

    const user = await User.findByIdAndUpdate(
      req.user.id,
      updateData,
      {
        new: true,
        runValidators: true // VERY IMPORTANT
      }
    );

    res.json(user);

  } catch (err) {
    console.error("UPDATE ERROR:", err.message); // DEBUG LINE
    res.status(500).json({ message: err.message });
  }
};