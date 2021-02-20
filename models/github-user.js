const mongoose = require("mongoose");

const User = new mongoose.Schema({
  githubId: {
    type: String,
    required: true,
  },
  displayName: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("GitHubUser", User);
