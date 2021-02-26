const express = require("express");
const { ensureAuth, ensureGuest } = require("../middleware/ensure-auth");
const OauthUser = require("../models/oauthSchema");
const router = express.Router();

router.get("/", (req, res) => {
  res.send("Nothing here");
});

router.get("/login", ensureGuest, (req, res) => {
  res.render("login");
});
router.get("/register", ensureGuest, (req, res) => {
  res.render("register");
});

router.get("/secrets", ensureAuth, (req, res) => {
  OauthUser.find({ secret: { $ne: null } }, (err, foundSecret) => {
    err
      ? console.error(err)
      : res.render("secrets", {
          name: req.user.displayName,
          userSecret: foundSecret,
        });
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
