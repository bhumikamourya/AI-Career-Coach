const resumeBuilderService = require("../services/resumeBuilderService");
const { runEngine } = require("../services/engineService");

// SAVE
exports.saveResume = async (req, res) => {
  try {
    const { user, resume } =
      await resumeBuilderService.saveResumeData(
        req.user.id,
        req.body
      );

    const result = await runEngine(user);

    res.json({
      message: "Resume + Profile updated",
      resume,
      user,
      ...result
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET
exports.getResume = async (req, res) => {
  try {
    const data = await resumeBuilderService.getResumeData(req.user.id);
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};