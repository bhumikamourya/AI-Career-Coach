const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    score: {
      type: Number,
      default: 0,
    },

    total: {
      type: Number,
      default: 0,
    },

    percentage: {
      type: Number,
      default: 0,
    },

    correct: {
      type: Number,
      default: 0,
    },

    wrong: {
      type: Number,
      default: 0,
    },

    answers: [
      {
        question: {
          type: String,
          default: "",
        },

        selected: {
          type: String,
          default: "",
        },

        correct: {
          type: String,
          default: "",
        },

        isCorrect: {
          type: Boolean,
          default: false,
        },

        topic: {
          type: String,
          default: "",
        },
      },
    ],

    topicStats: {
      type: Object,
      default: {},
    },

    weakSkillsSnapshot: [
      {
        type: String,
      },
    ],

    readinessScore: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Result", resultSchema);