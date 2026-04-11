const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { getSkillGap } = require("../services/skillGapService");
const { generateRoadmap } = require("../services/roadmapService");

const { extractSkills } = require("../services/skillExtractionService");
const { extractEducation, extractProjects } = require("../services/resumeParserService");
const User = require("../models/User");
const Resume = require("../models/Resume");

exports.uploadResume = async (req, res) => {
  try {
    // 1. FILE CHECK
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    let extractedText = "";

    // 2. FILE TYPE HANDLING
    if (req.file.mimetype === "application/pdf") {
      const dataBuffer = fs.readFileSync(filePath);
      const data = await pdfParse(dataBuffer);
      extractedText = data.text;
    }
    else if (
      req.file.mimetype ===
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    ) {
      const result = await mammoth.extractRawText({ path: filePath });
      extractedText = result.value;
    }
    else {
      return res.status(400).json({
        message: "Only PDF and DOCX allowed"
      });
    }

    // 3. SKILL, projects, eduaction EXTRACTION
    const extractedSkills = extractSkills(extractedText);
    const extractedEducation = extractEducation(extractedText);
    const extractedProjects = extractProjects(extractedText);

    // 4. FETCH USER
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 5. REMOVE DUPLICATES (IMPORTANT)
    const existingSkills = user.skills.map(s =>
      typeof s === "string" ? s.toLowerCase() : s.name.toLowerCase()
    );

    const detectLevel = (text, skill) => {
      const lower = text.toLowerCase();

      if (lower.includes(`advanced ${skill}`)) return "Advanced";
      if (lower.includes(`intermediate ${skill}`)) return "Intermediate";

      return "Beginner";
    };

    const newSkills = extractedSkills
      .filter(skill => !existingSkills.includes(skill.toLowerCase()))
      .map(skill => ({
        name: skill.toLowerCase(),
        level: detectLevel(extractedText, skill)
      }));

    // 6. MERGE SKILLS
    user.skills.push(...newSkills);

   // Merge Projects
if (extractedProjects.length > 0 ) {
  user.projects = extractedProjects;
}

// Merge Education
if (extractedEducation.length > 0 ) {
  user.education = extractedEducation;
}

    user.resumeType = "upload";
    user.resumeUrl = filePath;

    await user.save();

    await Resume.findOneAndUpdate(
  { userId: req.user.id },
  {
    userId: req.user.id,
    rawText: extractedText,
    parsedData: {
      name: user.name,
      email: user.email,
      education: extractedEducation,
      skills: extractedSkills,
      projects: extractedProjects,
      experience: ""
    },
    source: "upload"
  },
  { upsert: true }
);

    const gap = getSkillGap(user.skills, user.targetRole);
    const roadmap = generateRoadmap(user.targetRole, gap.missingSkills);

    // 7. RESPONSE
    res.json({
      message: "Resume uploaded & skills updated",
      text: extractedText,
      extractedSkills: extractedSkills,
      addedSkills: newSkills.map(s => s.name),
      education: extractedEducation,
      projects: extractedProjects,
      gap,
      roadmap
    });
// console.log(JSON.stringify(extractedProjects, null, 2));
  } catch (err) {
    console.error("RESUME ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};