const fs = require("fs");
const pdfParse = require("pdf-parse");
const mammoth = require("mammoth");

exports.uploadResume = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    const filePath = req.file.path;
    let extractedText = "";

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

    res.json({
      message: "Resume uploaded",
      text: extractedText
    });

  } catch (err) {
    console.error("RESUME ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};