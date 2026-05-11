const mongoose = require("mongoose");

const cacheSchema = new mongoose.Schema({
  cacheKey: String,
  role: String,
  skills: [String],
  questions: Array
}, { timestamps: true });

module.exports = mongoose.model("AIInterviewCache", cacheSchema);