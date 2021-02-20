const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");
const UserSchema = new mongoose.Schema({
  googleId: {
    type: String,
  },
  facebookId: {
    type: String,
  },
  githubId: {
    type: String,
  },
  displayName: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  username: String,
  secret: String,
  password: String,
  image: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});
UserSchema.plugin(passportLocalMongoose);
module.exports = mongoose.model("OauthUser", UserSchema);
