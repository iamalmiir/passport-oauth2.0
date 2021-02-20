const express = require("express");
const passport = require("passport");
const LocalUser = require("../models/LocalUser");
const router = express.Router();
passport.use(LocalUser.createStrategy());

passport.serializeUser(function (user, done) {
  done(null, user);
});
passport.deserializeUser(function (user, done) {
  done(null, user);
});

router.post("/register", (req, res) => {
  LocalUser.register(
    {
      firstName: req.body.fName,
      lastName: req.body.lName,
      username: req.body.username,
    },
    req.body.password,
    (err, user) => {
      if (err) {
        console.log(err);
        res.redirect("/register");
      } else {
        passport.authenticate("local")(req, res, () => {
          res.redirect("/secrets");
        });
      }
    }
  );
});
router.post("/login", (req, res) => {
  const user = new LocalUser({
    username: req.body.username,
    password: req.body.password,
  });
  req.login(user, (err) => {
    if (err) {
      console.log(err);
    } else {
      passport.authenticate("local")(req, res, () => {
        res.redirect("/secrets");
      });
    }
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
    console.log(req.user);
    res.redirect("/secrets");
  }
);

router.post("/submit", (req, res) => {
  const secret = req.body.secret;

  LocalUser.findOne(req.user, (err, foundUser) => {
    if (err) {
      console.error(err);
    } else {
      if (foundUser) {
        const allSecrets = [];
        foundUser.secret = secret;
        foundUser.save(() => {
          res.redirect("/secrets");
        });
      }
    }
  });
});

module.exports = router;
