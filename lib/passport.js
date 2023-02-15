const passport = require("passport");
const googleStrategy = require("passport-google-oauth20").Strategy;

//GOOGLE AUTH CONFIG
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: process.env.GOOGLE_CALLBACK_URL,
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      return done(null, profile);
    }
  )
);

//SERIALIZE TO MAKE SESSION
passport.serializeUser((user, done) => {
  return done(null, user);
});

//DESERIALIZE TO DELETE SESSION
passport.deserializeUser((user, done) => {
  return done(null, user);
});

module.exports = passport;
