const resumeService = require("../services/resumeService");

exports.uploadResume = async (req, res) => {
  try {
    const result = await resumeService.processResumeUpload(
      req.user.id,
      req.file
    );

    res.json({
      message: "Resume uploaded & processed",
      ...result
    });
  } catch (err) {
    console.error("RESUME ERROR:", err);
    res.status(500).json({ message: err.message });
  }
};