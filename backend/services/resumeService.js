const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const { extractSkills } = require("./skillExtractionService");
const { extractEducation, extractProjects } = require("./resumeParserService");

const User = require("../models/User");
const Resume = require("../models/Resume");
const { runEngine } = require("./engineService");

exports.processResumeUpload = async (userId, file) => {
  if (!file) throw new Error("No file uploaded");

  const filePath = file.path;
  let extractedText = "";

  // FILE PARSE
  if (file.mimetype === "application/pdf") {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    extractedText = data.text;
  } else if (
    file.mimetype ===
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    const result = await mammoth.extractRawText({ path: filePath });
    extractedText = result.value;
  } else {
    throw new Error("Only PDF and DOCX allowed");
  }

  // USER FETCH
  const user = await User.findById(userId);
  if (!user) throw new Error("User not found");

  // EXTRACTION
  const extractedSkillsRaw =
    (await extractSkills(extractedText, user.targetRole)) || [];

  const extractedSkills = extractedSkillsRaw
    .map((s) => (typeof s === "string" ? s : s?.name || ""))
    .map((s) => s.toLowerCase())
    .filter(Boolean);

  const extractedEducation = extractEducation(extractedText);
  const extractedProjects = extractProjects(extractedText);

  // LEVEL DETECTION
  const detectLevel = (text, skill) => {
    const lower = text.toLowerCase();
    const s = skill.toLowerCase();

    if (lower.includes(`advanced ${s}`)) return "Advanced";
    if (lower.includes(`intermediate ${s}`)) return "Intermediate";

    return "Beginner";
  };

  // BUILD RESUME SKILLS
  const resumeSkills = extractedSkills
    .map((skill) => ({
      name: skill,
      level: detectLevel(extractedText, skill),
      source: "resume"
    }))
    .filter(Boolean);


  const skillMap = new Map();

  user.skills.forEach(s => {
    skillMap.set(s.name.toLowerCase(), s);
  });

  resumeSkills.forEach(s => {
    skillMap.set(s.name.toLowerCase(), s); // overwrite
  });

  user.skills = Array.from(skillMap.values());

  // PROJECTS + EDUCATION
  if (extractedProjects.length) user.projects = extractedProjects;
  if (extractedEducation.length) user.education = extractedEducation;

  user.resumeType = "upload";
  user.resumeUrl = filePath;

  // ENGINE RUN 
  const result = await runEngine(user);

  // SAVE RESUME RAW
  await Resume.findOneAndUpdate(
    { userId },
    {
      userId,
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

  return {
    extractedSkills,
    resumeSkills: resumeSkills.map((s) => s.name),
    education: extractedEducation,
    projects: extractedProjects,
    ...result
  };
};