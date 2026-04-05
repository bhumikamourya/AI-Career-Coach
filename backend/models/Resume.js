const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
      required: true,
      unique: true // one resume per user
  },
  name: {
    type: String,
    required: true
},
  email: {
    type: String,
    required: true
},
  education: {
    type: String,
    required: true
},
  skills: {
      type: [String],
      default: []
    },
  experience: String,
  projects: String
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);