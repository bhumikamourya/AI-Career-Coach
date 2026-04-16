const userService = require("../services/userService");
// GET PROFILE
exports.getProfile = async (req, res) => {
  try {
    const user = await userService.getUserProfile(req.user.id);
    res.json({user});
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE PROFILE
exports.updateProfile = async (req, res) => {
  try {
    const user = await userService.updateUserProfile(
      req.user.id,
      req.body
    );

    res.json({
      user
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE SKILL
exports.deleteSkill = async (req, res) => {
  try {

    const user = await userService.deleteUserSkill(
      req.user.id,
      req.params.name
    );

    res.json(user);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};