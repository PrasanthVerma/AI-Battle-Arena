import express from "express";
import {
  RegisterController,
  LoginController,
  GetProfileController,
  LogoutController,
  GoogleAuthCallback,
  GetCurrentUserController,
} from "../Controllers/auth.controller.js";
import passport from "passport";

const router = express.Router();

// ========== LOCAL AUTH ROUTES ==========
router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/profile", GetProfileController);
router.get("/logout", LogoutController);

// ========== GOOGLE OAUTH ROUTES ==========
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  }),
);

router.get(
  "/google/callback",
  passport.authenticate("google", {
    failureRedirect: process.env.FRONTEND_URL || "http://localhost:5173/login",
    session: true,
  }),
  GoogleAuthCallback,
);

// ========== SESSION-BASED USER ROUTE ==========
router.get("/user", GetCurrentUserController);

export default router;
