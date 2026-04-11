const Resume = require("../models/Resume");
const User = require("../models/User");

// CREATE / UPDATE
exports.saveResume = async (req, res) => {
  try {
    const { name, email, education, skills, experience, projects } = req.body;

    const user = await User.findById(req.user.id);

    const finalName = name && name.trim() ? name : user.name;
    const finalEmail = email && email.trim() ? email : user.email;

    const resume = await Resume.findOneAndUpdate(
  { userId: req.user.id },
  {
    userId: req.user.id,
    parsedData: {
      name: finalName,
      email: finalEmail,
      education: [
        {
          college: education,
          degree: "",
          year: ""
        }
      ],
      skills,
      projects: user.projects, // structured
      experience
    },
    source: "builder"
  },
  { returnDocument: "after", upsert: true }
);

    // skills → convert to proper format
    const existing = user.skills.map(s => s.name.toLowerCase().trim());

    const newSkills = (skills || [])
      .map(s => s.toLowerCase().trim())
      .filter(s => s && !existing.includes(s))
      .map(s => ({
        name: s,
        level: "Beginner"
      }));

    user.skills.push(...newSkills);

    if (education && education.trim().length > 0) {
      user.education = [
        {
          college: education,
          degree: "",
          year: ""
        }
      ];
    }

    const projectList = (projects || "")
      .split("\n")
      .filter(p => p.trim().length > 5);

    user.projects = projectList.map(p => {
      const parts = p.split(" - "); // optional split

      return {
        title: parts[0] || "",
        description: parts[1] || "",
        techStack: []
      };
    });

    user.isProfileComplete = user.calculateProfileCompletion();

    user.resumeType = "builder";

    await user.save();

    res.json({
      message: "Resume + Profile updated",
      resume,
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET
exports.getResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({ userId: req.user.id });
    const user = await User.findById(req.user.id);

    // Only use builder if it has actual data
    if (resume && resume.name) {
      return res.json({
        source: "builder",
        data: resume
      });
    }

    // Otherwise fallback to uploaded data
    return res.json({
      source: "upload",
      data: {
        name: user.name,
        email: user.email,
        education: user.education?.[0]?.college || "",
        skills: user.skills.map(s => s.name),
        experience: "",
        projects: user.projects
          ?.map(p => {
            let line = p.title;

            if (p.description) {
              line += " - " + p.description;
            }

            return line;
          })
          .join("\n") || ""
      }
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};