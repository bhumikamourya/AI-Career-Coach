const User = require("../models/User");
const Role = require("../models/Role");

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

    let isChanged = false;

    if (updateData.targetRole && updateData.targetRole !== user.targetRole) {
      const roleData = await Role.findOne({ name: updateData.targetRole });

      if (!roleData) {
        return res.status(400).json({ message: "Invalid role selected" });
      }

      user.targetRole = updateData.targetRole;

      //  IMPORTANT: update role skills
      user.roleSkills = roleData.skills;

      //  RESET EVERYTHING
      user.progress = [];
      user.evaluatedSkills = [];
      user.readinessScore = 0;

      isChanged = true;
    }

    // SKILL CHANGE
    if (updateData.skills) {
      user.skills = updateData.skills;

      // RESET evaluation only
      user.evaluatedSkills = [];

      isChanged = true;
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

    user.evaluatedSkills = [];

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