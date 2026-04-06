const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

const { extractSkills } = require("../services/skillExtractionService");
const User = require("../models/User");

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

    // 3. SKILL EXTRACTION
    const extractedSkills = extractSkills(extractedText);

    // 4. FETCH USER
    const user = await User.findById(req.user.id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // 5. REMOVE DUPLICATES (IMPORTANT)
    const existingSkills = user.skills.map(s =>
      typeof s === "string" ? s.toLowerCase() : s.name.toLowerCase()
    );

    const newSkills = extractedSkills
      .filter(skill => !existingSkills.includes(skill.toLowerCase()))
      .map(skill => ({
        name: skill.toLowerCase(),
        level: "Beginner"
      }));

    // 6. MERGE SKILLS
    user.skills.push(...newSkills);

    await user.save();

    // 7. RESPONSE
    res.json({
      message: "Resume uploaded & skills updated",
      text: extractedText,
      extractedSkills: extractedSkills,
      addedSkills: newSkills.map(s => s.name)
    });

  } catch (err) {
    console.error("RESUME ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};