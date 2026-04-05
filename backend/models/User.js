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
      type: [String],
      default: []
    },
    targetRole: {
      type: String,
      default: "" ,
      enum: ["Frontend Developer", "Backend Developer", "Full Stack Developer"]
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", userSchema);