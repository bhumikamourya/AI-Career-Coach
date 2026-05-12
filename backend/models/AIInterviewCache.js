const mongoose = require("mongoose");

const cacheSchema = new mongoose.Schema(
  {
    cacheKey: {
      type: String,
      required: true,
      unique: true
    },

    role: {
      type: String,
      required: true
    },

    skills: {
      type: [String],
      default: []
    },

    questions: {
      type: Array,
      default: []
    }
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "AIInterviewCache",
  cacheSchema
);