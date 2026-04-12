const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Role = require("../models/Role");

// REGISTER
exports.register = async (req, res) => {
  try {
    const { name, email, password, targetRole, skills } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields required" });
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    let cleanedSkills = [];

    if (skills && Array.isArray(skills)) {
      cleanedSkills = skills
        .filter((s) => s.name && s.name.trim() !== "")
        .map((s) => ({
          name: s.name.trim(),
          level: s.level || "Beginner"
        }));
    }

    if (targetRole) {
  const roleData = await Role.findOne({ name: targetRole });

  if (!roleData) {
    return res.status(400).json({ message: "Invalid role selected" });
  }

  roleSkills = roleData.skills;
}

if (!targetRole) {
  return res.status(400).json({ message: "Target role is required" });
}
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      targetRole,
      skills: cleanedSkills,
      roleSkills
    });

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(201).json({
      message: "User registered",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        targetRole: user.targetRole,
        skills: user.skills
      }
    });
    // console.log("REGISTER BODY:", req.body);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// LOGIN
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.json({
      message: "Login successful",
      token,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        targetRole: user.targetRole,
        skills: user.skills
      }
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};