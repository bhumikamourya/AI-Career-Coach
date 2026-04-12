const mongoose = require("mongoose");

const roleSchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true
  },

  skills: [
    {
      name: String,
      level: String,
      weight: Number
    }
  ]
});

module.exports = mongoose.model("Role", roleSchema);