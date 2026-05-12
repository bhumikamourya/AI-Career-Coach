const mongoose = require("mongoose");

const testSessionSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },

    // Store full question objects (snapshot of test)
    questions: {
      type: Array,
      default: []
    },

    // Store user answers during test
    answers: [
      {
        questionId: String,
        selected: String
      }
    ],
  //  UPDATED (supports string + object both)
    aiQuestions: {
      type: [
        {
          type: mongoose.Schema.Types.Mixed
          /*
            can be:
            "What is JS?"
            
            OR
            
            {
              type: "coding",
              question: "Reverse string",
              input: "hello",
              output: "olleh"
            }
          */
        }
      ],
      default: []
    },
     // User typed answers
    aiAnswers: {
      type: [String],
      default: []
    },
     
    apiKey: {
      type: String
    },

    // Track current question index (for resume after refresh)
    currentIndex: {
      type: Number,
      default: 0
    },

    // Marks test completed or not
    isCompleted: {
      type: Boolean,
      default: false
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("TestSession", testSessionSchema);