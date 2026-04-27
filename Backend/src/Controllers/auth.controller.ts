import User from "../Models/user.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import type { Request, Response } from "express";
import passport from "passport";

//Regiter controller , Register a new user
export const RegisterController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({
      $or: [{ username }, { email }],
    });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }
  } catch (error) {
    console.error("Error in registerController:", error);
    res.status(500).json({ message: "Internal server error" });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await User.create({
    username,
    email,
    password: hashedPassword,
  });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1h",
  });
  res.cookie("token", token);
  return res.status(201).json({
    message: "User registered successfully",
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
    },
  });
};

//Login controller , Login a user
export const LoginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "Invalid Email" });
    }

    if (!user.password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "1h",
    });

    res.cookie("token", token);

    return res.status(200).json({
      message: "Login successful",
      user: {
        _id: user._id,
        username: user.username,
        email: user.email,
      },
    });
  } catch (error) {
    console.error("Error in loginController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Get user profile controller , Get the profile of the logged in user
export const GetProfileController = async (req: Request, res: Response) => {
  try {
    let userId;

    if (req.user) {
      userId = (req.user as any)._id;
    } else if (req.cookies.token) {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET!) as {
        userId: string;
      };
      userId = decoded.userId;
    }

    if (!userId) {
      return res.status(401).json({ Message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password");
    return res.status(200).json({ user });
  } catch (error) {
    console.error("Error in getProfileController:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

//Logout controller , Logout a user by clearing the token cookie and session
export const LogoutController = async (req: Request, res: Response) => {
  req.logout((err) => {
    if (err) {
      return res.status(500).json({ message: "Logout failed" });
    }
    // Also clear JWT token cookie for local auth users
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  });
};

// ========== GOOGLE OAUTH CONTROLLERS ==========

// Google OAuth Callback Handler
export const GoogleAuthCallback = (req: Request, res: Response) => {
  if (!req.user) {
    return res.redirect(
      `${process.env.FRONTEND_URL || "http://localhost:5173"}/login?error=auth_failed`,
    );
  }

  // User is already authenticated by Passport and session is set
  res.redirect(
    `${process.env.FRONTEND_URL || "http://localhost:5173"}/home?oauth=success`,
  );
};

// Get Current User (Session-based)
export const GetCurrentUserController = async (req: Request, res: Response) => {
  if (!req.user) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const user = req.user as any;
  return res.status(200).json({
    user: {
      _id: user._id,
      username: user.username,
      email: user.email,
      displayName: user.displayName,
      profilePicture: user.profilePicture,
      authProvider: user.authProvider,
    },
  });
};
