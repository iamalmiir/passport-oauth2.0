const express = require("express");
const passport = require("passport");
const { ensureAuth, ensureGuest } = require("../middleware/ensure-auth");
const LocalUser = require("../models/LocalUser");
const GitHubUser = require("../models/github-user");
const router = express.Router();

router.get("/", (req, res) => {
  res.render("home");
});
router.get("/login", ensureGuest, (req, res) => {
  res.render("login");
});
router.get("/register", ensureGuest, (req, res) => {
  res.render("register");
});

router.get("/secrets", ensureAuth, (req, res) => {
  LocalUser.find({ secret: { $ne: null } }, (err, foundSecret) => {
    if (err) {
      console.error(err);
    } else {
      if (foundSecret) {
        res.render("secrets", {
          name: req.user.firstName,
          userSecret: foundSecret,
        });
      }
    }
  });
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/register");
});

router.get("/submit", ensureAuth, (req, res) => {
  res.render("submit");
});
module.exports = router;
