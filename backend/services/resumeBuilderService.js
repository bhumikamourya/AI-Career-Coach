const Resume = require("../models/Resume");
const User = require("../models/User");
const { runEngine } = require("./engineService");

exports.saveResumeData = async (userId, data) => {
  const { name, email, education, skills, experience, projects } = data;

  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  const finalName = name?.trim() || user.name;
  const finalEmail = email?.trim() || user.email;

  // SAVE RESUME
  const resume = await Resume.findOneAndUpdate(
    { userId },
    {
      userId,
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
        projects: user.projects,
        experience
      },
      source: "builder"
    },
    { new: true, upsert: true }
  );

  // SKILL OVERRIDE (FINAL FIX)
  user.skills = (skills || [])
    .map(s => s.toLowerCase().trim())
    .filter(Boolean)
    .map(s => ({
      name: s,
      level: "Beginner",
      source: "manual"
    }));

  // RESET AI EVALUATION (IMPORTANT)
  user.evaluatedSkills = [];

  // EDUCATION
  if (education?.trim()) {
    user.education = [
      {
        college: education,
        degree: "",
        year: ""
      }
    ];
  }

  // PROJECTS
  const projectList = (projects || "")
    .split("\n")
    .map(p => p.trim())
    .filter(p => p.length > 0);

  user.projects = projectList.map(p => {
    const [title, ...descParts] = p.split(" - ");

    return {
      title: title || "",
      description: descParts.join(" - ") || "", // handles multiple dashes
      techStack: []
    };
  });

  user.isProfileComplete = user.calculateProfileCompletion();
  user.resumeType = "builder";

  await user.save();
  const result = await runEngine(user);

  return { user, resume, ...result };
};


exports.getResumeData = async (userId) => {
  const resume = await Resume.findOne({ userId });
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  // Prefer builder
  if (resume && resume.parsedData) {
    return {
      source: "builder",
      data: resume.parsedData
    };
  }

  // fallback upload
  return {
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
          if (p.description) line += " - " + p.description;
          return line;
        })
        .join("\n") || ""
    }
  };
};