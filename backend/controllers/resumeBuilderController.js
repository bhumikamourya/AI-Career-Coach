const Resume = require("../models/Resume");

// CREATE / UPDATE
exports.saveResume = async (req, res) => {
  try {
    const { name, email, education, skills, experience, projects } = req.body;

    const resume = await Resume.findOneAndUpdate(
      { userId: req.user.id },
      {
        userId: req.user.id,
        name,
        email,
        education,
        skills,
        experience,
        projects
      },
      { new: true, upsert: true }
    );

    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    res.json(resume);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};