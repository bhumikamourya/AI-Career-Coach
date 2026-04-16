const User = require("../models/User");
const Role = require("../models/Role");

exports.getUserProfile = async (userId) => {
  return await User.findById(userId).select("-password");
};

exports.updateUserProfile = async (userId, data) => {
  const { targetRole, skills } = data;

  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  let isChanged = false;

  // ROLE CHANGE
  if (targetRole && targetRole !== user.targetRole) {
    const roleData = await Role.findOne({ name: targetRole });

    if (!roleData) throw new Error("Invalid role selected");

    user.targetRole = targetRole;
    // user.roleSkills = roleData.skills;

    // RESET EVERYTHING
    user.progress = [];
    user.evaluatedSkills = [];
    user.readinessScore = 0;

    isChanged = true;
  }

  // SKILLS UPDATE
  if (skills && Array.isArray(skills)) {
    user.skills = skills.map((skill) => ({
      name: typeof skill === "string" ? skill.trim() : skill.name.trim(),
      level: skill.level || "Beginner",
      source: "manual"
    }));

    user.evaluatedSkills = [];

    isChanged = true;
  }

  user.isProfileComplete = user.calculateProfileCompletion();

  await user.save();

  return user;
};

exports.deleteUserSkill = async (userId, skillName) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  user.skills = user.skills.filter(
    (s) => s.name.toLowerCase() !== skillName.toLowerCase()
  );

user.evaluatedSkills = user.evaluatedSkills.filter(
  (s) => s.name.toLowerCase() !== skillName.toLowerCase()
);
  await user.save();

  return user;
};