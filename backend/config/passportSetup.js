const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const User = require("../models/User"); // ✅ Ensure the correct path

require("dotenv").config();

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // ✅ Step 1: Check if a user with this email already exists
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          // ✅ If user exists but has no Google ID, update it
          if (!user.googleId) {
            user.googleId = profile.id;
            await user.save();
          }
        } else {
          // ✅ Step 2: If no user found, create a new one
          user = new User({
            googleId: profile.id,
            name: profile.displayName,
            email: profile.emails[0].value,
            profilePic: profile.photos[0].value, // ✅ Match database field
            password: null, // ✅ Ensure password is NULL for Google users
          });
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// ✅ Serialize user
passport.serializeUser((user, done) => {
  done(null, user.id);
});

// ✅ Deserialize user
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});
