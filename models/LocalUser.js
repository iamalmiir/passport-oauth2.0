const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const newUser = new mongoose.Schema({
  firstName: String,
  lastName: String,
  username: String,
  secret: Array,
  password: String,
});
newUser.plugin(passportLocalMongoose);
const User = mongoose.model("User", newUser);
module.exports = User;
