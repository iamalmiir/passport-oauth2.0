const FacebookStrategy = require("passport-facebook");
const FaceBookUser = require("../models/facebook-user");
const mongoose = require("mongoose");

module.exports = function (passport) {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.FACEBOOK_APP_ID,
        clientSecret: process.env.FACEBOOK_APP_SECRET,
        callbackURL: "https://localhost:3000/auth/facebook/secrets",
        profile: ["id", "displayName"],
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          facebookId: profile.id,
          displayName: profile.displayName,
        };

        try {
          let user = await FaceBookUser.findOne({ facebookId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await FaceBookUser.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
};
