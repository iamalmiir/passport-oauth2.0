const express = require("express");
const passport = require("passport");
const OauthUser = require("../models/oauthSchema");
const router = express.Router();
passport.use(OauthUser.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.post("/register", (req, res) => {
  OauthUser.register(
    {
      displayName: req.body.displayName,
      username: req.body.username,
    },
    req.body.password,
    (err, user) => {
      err
        ? (console.log(err), res.redirect("/register"))
        : passport.authenticate("local")(req, res, () => {
            res.redirect("/secrets");
          });
    }
  );
});
router.post("/login", (req, res) => {
  const user = new OauthUser({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, (err) => {
    err
      ? console.log(err)
      : passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
  });
});

router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile"] })
);

router.get(
  "/auth/google/secrets",
  passport.authenticate("google", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/secrets");
  }
);

router.get("/auth/facebook", passport.authenticate("facebook"));

router.get(
  "/auth/facebook/secrets",
  passport.authenticate("facebook", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/secrets");
  }
);

router.get("/auth/github", passport.authenticate("github"));

router.get(
  "/auth/github/secrets",
  passport.authenticate("github", { failureRedirect: "/" }),
  (req, res) => {
    res.redirect("/secrets");
  }
);

router.post("/submit", (req, res) => {
  const secret = req.body.secret;
  OauthUser.findOne(req.user, (err, foundUser) => {
    err
      ? console.error(err)
      : ((foundUser.secret = secret),
        foundUser.save(() => {
          res.redirect("/secrets");
        }));
  });
});

module.exports = router;
