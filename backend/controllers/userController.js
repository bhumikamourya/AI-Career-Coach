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

    const user = await User.findById(req.user.id);

    // update role
    if (updateData.targetRole) {
      user.targetRole = updateData.targetRole;
    }

    // update skills
    if (updateData.skills) {
      user.skills = updateData.skills;
    }

    user.isProfileComplete = user.calculateProfileCompletion();

    await user.save();

    res.json(user);

  } catch (err) {
    console.error("UPDATE ERROR:", err.message); // DEBUG LINE
    res.status(500).json({ message: err.message });
  }
};

exports.deleteSkill = async (req, res) => {
  try {
    const { name } = req.params;

    if (!name) {
      return res.status(400).json({ message: "Skill name required" });
    }

    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.skills = user.skills.filter(
      (s) => s.name.toLowerCase() !== name.toLowerCase()
    );

    await user.save();

    res.json(user);

  } catch (err) {
    console.log("PARAM:", req.params);
        console.error("DELETE ERROR:", err);

    res.status(500).json({ message: err.message });
  }
};

exports.updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;

    const user = await User.findById(req.user.id);

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Old password incorrect" });
    }

    user.password = await bcrypt.hash(newPassword, 10);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};