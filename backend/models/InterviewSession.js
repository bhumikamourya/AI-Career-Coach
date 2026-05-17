const mongoose = require("mongoose");

const interviewSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    role: {
      type: String,
      required: true
    },

    sessionNumber: {
  type: Number,
  required: true
},

    questions: {
      type: [String],
      default: []
    },

    answers: {
      type: [String],
      default: []
    },

    feedback: [
      {
        question: String,
        answer: String,
        feedback: String,
        correctAnswer: String
      }
    ],


    interviewScore: {
  type: Number,
  default: 0
},

readinessScore: {
  type: Number,
  default: 0
},

readinessStatus: {
  type: String,
  enum: ["READY", "NOT_READY"],
  default: "NOT_READY"
},

    status: {
      type: String,
      enum: ["active", "submitted", "processing", "completed"],
      default: "active"
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("InterviewSession", interviewSessionSchema);