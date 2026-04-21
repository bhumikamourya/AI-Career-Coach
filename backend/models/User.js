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
      lowercase: true,
      unique: true,
      trim: true
    },
    password: {
      type: String,
      required: true
    },
    skills: { //user input
      type: [
        {
          name: {
            type: String,
            required: true,
            trim: true
          },
          level: {
            type: String,
            enum: ["Beginner", "Intermediate", "Advanced"],
            default: "Beginner"
          },
          source: {
            type: String,
            enum: ["manual", "resume"],
            default: "manual"
          }
        }
      ],
      default: []
    },
    evaluatedSkills: [ //system/test based
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
      default: ""
    },
    isProfileComplete: {
      type: Boolean,
      default: false
    },
    readinessScore: {
      type: Number,
      default: 0
    },
    roadmap: { type: Array, default: [] },
    skillGap: { type: Object, default: {} },
    aiInsight: {
      summary: String,
      whyItMatters: String,
      learningOrder: [String],
      prioritySkills: [
        {
          name: String,
          reason: String
        }
      ],
      difficulty: [
        {
          name: String,
          level: String
        }
      ],
      motivation: String
    },
    // USER-FACING DATA (derived / merged)
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
    resumeType: {
      type: String,
      enum: ["upload", "builder"],
      default: null
    },
    // CORE SYSTEM STATE
    currentPhase: {
      type: String,
      enum: [
        "PROFILE_SETUP",
        "SKILL_ANALYSIS",
        "ROADMAP",
        "PRACTICE",
        "TEST",
        "INTERVIEW_READY"
      ],
      default: "PROFILE_SETUP"
    },
    attempts: [
      {
        percentage: Number,
        date: Date
      }
    ],

    interviewScore: {
      type: Number,
      default: 0
    }
  },

  { timestamps: true }
);
//  PROFILE COMPLETION LOGIC
userSchema.methods.calculateProfileCompletion = function () {
  return !!(this.targetRole && this.skills && this.skills.length > 0);
};

module.exports = mongoose.model("User", userSchema);