const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");
const { extractSkills } = require("../services/skillExtractionService");
const { extractEducation, extractProjects } = require("../services/resumeParserService");
const User = require("../models/User");
const Resume = require("../models/Resume");
const { runEngine } = require("../services/engineService");

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

    // 4. FETCH USER
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // SKILL, projects, eduaction EXTRACTION
    const extractedSkillsRaw = await extractSkills(
      extractedText,
      user.targetRole
    ) || [];

    const extractedSkills = (extractedSkillsRaw || [])
      .map(s => typeof s === "string" ? s : s?.name || "")
      .map(s => s.toLowerCase())
      .filter(Boolean);
    const extractedEducation = extractEducation(extractedText);
    const extractedProjects = extractProjects(extractedText);

    // detect level
    const detectLevel = (text, skill) => {
      const lower = text.toLowerCase();
      const s = skill.toLowerCase();

      if (lower.includes(`advanced ${s}`)) return "Advanced";
      if (lower.includes(`intermediate ${s}`)) return "Intermediate";

      return "Beginner";
    };

    // build fresh resume skills
    const resumeSkills = extractedSkills
      .map(skill => {
        const name =
          typeof skill === "string"
            ? skill
            : skill?.name || skill?.skill || "";

        if (!name) return null;

        return {
          name: name.toLowerCase(),
          level: detectLevel(extractedText, name),
          source: "resume"
        };
      })
      .filter(Boolean);

const extractedSkillSet = new Set(
  extractedSkills.map(s => s.toLowerCase())
);
    const manualSkills = user.skills.filter(
      s =>
        s.source === "manual" &&
        !extractedSkillSet.has(s.name.toLowerCase())
    );
    // FINAL MERGE (clean)
    user.skills = [...manualSkills, ...resumeSkills];

    // Merge Projects
    if (extractedProjects.length > 0) {
      user.projects = extractedProjects;
    }

    // Merge Education
    if (extractedEducation.length > 0) {
      user.education = extractedEducation;
    }

    user.resumeType = "upload";
    user.resumeUrl = filePath;
        const result = await runEngine(user);

    // await user.save();

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

    // 7. RESPONSE
    res.json({
      message: "Resume uploaded & skills updated",
      // text: extractedText,
      extractedSkills: extractedSkills,
      resumeSkills: resumeSkills.map(s => s.name),
      education: extractedEducation,
      projects: extractedProjects,
      ...result
    });
    // console.log(JSON.stringify(extractedProjects, null, 2));
  } catch (err) {
    console.error("RESUME ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};