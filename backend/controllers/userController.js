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
      updateData.skills = skills.map((skill) => {
        if (typeof skill === "string") {
          return {
            name: skill.trim(),
            level: "Beginner"
          };
        }

        return {
          name: skill.name.trim(),
          level: skill.level || "Beginner"
        };
      });
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

exports.deleteSkill = async (req, res) => {
  try {
    const { name } = req.body;

    const user = await User.findById(req.user.id);

    user.skills = user.skills.filter(
      (s) => s.name.toLowerCase() !== name.toLowerCase()
    );

    await user.save();

    res.json(user);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};