import passport from "passport";
// import { Strategy as LocalStrategy } from "passport-local";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import bcrypt from "bcryptjs";
import User from "../Models/user.model.js";

// export const localStrategy = passport.use(
//   new LocalStrategy(
//     async (username: string, password: string, done: Function) => {
//       try {
//         const user = await User.findOne({ username });
//         if (!user) {
//           return done(null, false, { message: "Incorrect username." });
//         }
//         const isMatch = await bcrypt.compare(password, user.password);
//         if (!isMatch) {
//           return done(null, false, { message: "Incorrect password." });
//         }
//         return done(null, user);
//       } catch (error) {
//         return done(error);
//       }
//     },
//   ),
// );

export const googleStrategy = passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      callbackURL: "/auth/google/callback",
    },
    async (_, __, profile, done) => {
      return done(null, profile);
    },
  ),
);
