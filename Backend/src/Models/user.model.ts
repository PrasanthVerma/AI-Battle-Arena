import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: false, // Optional for OAuth-only users
    },
    // OAuth Fields
    googleId: {
      type: String,
      unique: true,
      sparse: true, // Allows null values for local auth users
      index: true,
    },
    displayName: {
      type: String,
      default: null,
    },
    profilePicture: {
      type: String,
      default: null,
    },
    authProvider: {
      type: String,
      enum: ["local", "google"],
      default: "local",
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt
  },
);

const User = mongoose.model("User", userSchema);
export default User;
