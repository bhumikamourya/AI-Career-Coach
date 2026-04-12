const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true
  },
  options: [String], // for MCQ

  answer: {
    type: String,
    required: true
  },
  type: {
    type: String,
    enum: ["mcq", "coding"],
    default: "mcq"
  },
  difficulty: {
    type: String,
    enum: ["easy", "medium", "hard"],
    default: "easy"
  },
  topic: {
    type: String,
    required :true
  },
  roles: [String]
  
//    roles: [
//   {
//     type: String,
//     enum: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
//   }
// ]
}, { timestamps: true });

module.exports = mongoose.model("Question", questionSchema);