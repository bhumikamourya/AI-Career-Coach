const mongoose = require("mongoose");

const resultSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User"
  },
  score: Number,
  total: Number,
  answers: [
    {
       question: String,
      selected: String,
      correct: String,
      isCorrect: Boolean  
    }
  ]
}, { timestamps: true });

module.exports = mongoose.model("Result", resultSchema);