import passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";
import dotenv from "dotenv";

dotenv.config();

// ========== LOCAL STRATEGY (Email/Password Auth) ==========
// passport.use(
//   "local",
//   new LocalStrategy(
//     {
//       usernameField: "email",
//       passwordField: "password",
//     },
//     async (email, password, done) => {
//       try {
//         const user = await User.findOne({ email });

//         if (!user) {
//           return done(null, false, { message: "Invalid email or password" });
//         }

//         if (!user.password) {
//           return done(null, false, {
//             message: "Please use Google login for your account",
//           });
//         }

//         const isMatch = await bcrypt.compare(password, user.password);

//         if (!isMatch) {
//           return done(null, false, { message: "Invalid email or password" });
//         }

//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     },
//   ),
// );

// ========== GOOGLE STRATEGY (OAuth) ==========
passport.use(
  "google",
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
      callbackURL:
        process.env.GOOGLE_CALLBACK_URL ||
        "http://localhost:3000/api/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        // Check if user exists by Google ID
        let user = await User.findOne({ googleId: profile.id });

        if (user) {
          // User exists, update profile info
          user.displayName = profile.displayName;
          user.profilePicture = profile.photos?.[0]?.value || "";
          user.updatedAt = new Date();
          await user.save();
          return done(null, user);
        }

        // User doesn't exist, check if email exists
        const email = profile.emails?.[0]?.value || "";
        const existingUser = await User.findOne({ email });

        if (existingUser) {
          // Email exists but no Google ID - link Google to existing account
          existingUser.googleId = profile.id;
          existingUser.displayName = profile.displayName;
          existingUser.profilePicture = profile.photos?.[0]?.value || "";
          existingUser.authProvider = "google";
          existingUser.updatedAt = new Date();
          await existingUser.save();
          return done(null, existingUser);
        }

        // Create completely new user
        const newUser = await User.create({
          googleId: profile.id,
          email: email,
          displayName: profile.displayName,
          username: email.split("@")[0] || "user", // Use email prefix as username
          profilePicture: profile.photos?.[0]?.value || "",
          authProvider: "google",
          password: undefined, // No password for Google auth
        } as any);

        return done(null, newUser);
      } catch (error) {
        return done(error);
      }
    },
  ),
);

// ========== SESSION SERIALIZATION ==========
passport.serializeUser((user: any, done) => {
  done(null, user._id);
});

passport.deserializeUser(async (id: string, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (error) {
    done(error);
  }
});

export default passport;
