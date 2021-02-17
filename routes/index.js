const express = require("express");
const passport = require("passport");
const { ensureAuth, ensureGuest } = require("../middleware/ensure-auth");
const router = express.Router();

router.get("/", ensureGuest, (req, res) => {
  res.render("home");
});
router.get("/login", ensureGuest, (req, res) => {
  res.render("login");
});
router.get("/register", ensureGuest, (req, res) => {
  res.render("register");
});

router.get("/secrets", ensureAuth, (req, res) => {
  res.render("secrets");
});

router.get("/logout", (req, res) => {
  req.logout();
  res.redirect("/register");
});

module.exports = router;
