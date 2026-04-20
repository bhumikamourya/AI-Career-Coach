const User = require("../../models/User");

const updateUserProgress = async (userId, topic, type) => {
  const user = await User.findById(userId);

  if (!user) throw new Error("User not found");

  user.progress = user.progress || [];

  let item = user.progress.find(p => p.topic === topic);

  if (!item) {
    item = {
      topic,
      theoryDone: false,
      practiceDone: false
    };
    user.progress.push(item);
  }

  let updated = false;

  if (type === "theory" && !item.theoryDone) {
    item.theoryDone = true;
    updated = true;
  }

  if (type === "practice" && !item.practiceDone) {
    item.practiceDone = true;
    updated = true;
  }

  await user.save();

  return { user, updated };
};

module.exports = { updateUserProgress };