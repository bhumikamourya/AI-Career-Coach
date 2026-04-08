const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true,
      unique: true
    },
    password: {
      type: String,
      required: true
    },
    skills: [
      {
        name: {
          type: String,
          required: true
        },
        level: {
          type: String,
          enum: ["Beginner", "Intermediate", "Advanced"],
          default: "Beginner"
        }
      }
    ],
    evaluatedSkills: [
      {
        name: String,
        level: String, // system calculated
      }
    ],
    progress: [
  {
    topic: String,
    theoryDone: {
      type: Boolean,
      default: false
    },
    practiceDone: {
      type: Boolean,
      default: false
    }
  }
],
    targetRole: {
      type: String,
      default: "",
      enum: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);