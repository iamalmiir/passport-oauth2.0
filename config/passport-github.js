const GitHubStrategy = require("passport-github2").Strategy;
const OauthUser = require("../models/oauthSchema");

module.exports = function (passport) {
  passport.use(
    new GitHubStrategy(
      {
        clientID: process.env.GITHUB_CLIENT_ID,
        clientSecret: process.env.GITHUB_CLIENT_SECRET,
        callbackURL: "https://localhost:3000/auth/github/secrets",
      },
      async (accessToken, refreshToken, profile, done) => {
        const newUser = {
          githubId: profile.id,
          displayName: profile.displayName,
        };
        try {
          let user = await OauthUser.findOne({ githubId: profile.id });

          if (user) {
            done(null, user);
          } else {
            user = await OauthUser.create(newUser);
            done(null, user);
          }
        } catch (err) {
          console.error(err);
        }
      }
    )
  );
};
