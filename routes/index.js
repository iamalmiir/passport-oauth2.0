const express = require("express");
const { ensureAuth, ensureGuest } = require("../middleware/ensure-auth");
const OauthUser = require("../models/oauthSchema");
const router = express.Router();

router.get("/", (req, res) => {
  //////////-------------
});
router.get("/login", ensureGuest, (req, res) => {
  res.render("login");
});
router.get("/register", ensureGuest, (req, res) => {
  res.render("register");
});

router.get("/secrets", ensureAuth, (req, res) => {
  OauthUser.find({ secret: { $ne: null } }, (err, foundSecret) => {
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
