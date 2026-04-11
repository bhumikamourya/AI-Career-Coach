const mongoose = require("mongoose");

const resumeSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
    unique: true
  },

  rawText: {
    type: String,
    default: ""
  },

  parsedData: {
    name: {
      type: String,
      trim: true
    }, email: {
      type: String,
      trim: true
    },
    education: [
      {
        college: String,
        degree: String,
        year: String
      }
    ],

    skills: [
      {
        type: String,
        trim: true
      }],

    projects: [
      {
        title: String,
        description: String,
        techStack: [String]
      }
    ],
    experience: {
      type: String,
      default: ""
    }
  },
  // SOURCE TRACKING
  source: {
    type: String,
    enum: ["upload", "builder"],
    required: true
  }
}, { timestamps: true });

module.exports = mongoose.model("Resume", resumeSchema);