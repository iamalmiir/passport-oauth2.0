const mongoose = require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose");

const newUser = new mongoose.Schema({
  fName: String,
  lName: String,
  username: String,
  password: String,
});
newUser.plugin(passportLocalMongoose);
const User = mongoose.model("User", newUser);
module.exports = User;
