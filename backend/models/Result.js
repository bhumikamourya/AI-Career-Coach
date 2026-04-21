const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  score: Number,
  total: Number,
  percentage: Number,  
  correct: Number, 
  wrong: Number,  
  answers: [
    {
      question: String,
      selected: String,
      correct: String,
      isCorrect: Boolean
    }
  ],
  topicStats: Object,
  weakSkillsSnapshot: [String],
  readinessScore: Number
  // createdAt: {
  //   type: Date,
  //   default: Date.now
  // }

}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);