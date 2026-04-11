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
    skills: {
      type: [
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
      default: []
    },
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
    },
    isProfileComplete: {
      type: Boolean,
      default: false
    },
    readinessScore: {
      type: Number,
      default: 0
    },

    education: [
  {
    college: String,
    degree: String,
    year: String
  }
],

projects: [
  {
    title: String,
    description: String,
    techStack: [String]
  }
],

resumeUrl: String,
  },

  { timestamps: true }
);

userSchema.methods.calculateProfileCompletion = function () {
  return (
    this.targetRole &&
    this.skills.length > 0 
    // &&
    // this.education?.length > 0 &&
    // this.projects?.length > 0
  );
};

module.exports = mongoose.model("User", userSchema);