// const User = require("../models/User");
// const { runEngine } = require("../services/engineService");

// exports.getRoadmap = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     const result = await runEngine(user);

//     return res.json(result);

//   } catch (err) {
//     return res.status(500).json({
//       message: err.message
//     });
//   }
// };