import express from "express";
import {
  RegisterController,
  LoginController,
  GetProfileController,
  LogoutController,
  GoogleOAuthController,
  GoogleOAuthCallbackController,
} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/profile", GetProfileController);
router.get("/logout",LogoutController);
router.get("/google",GoogleOAuthController);
router.get("/google/callback",GoogleOAuthCallbackController);

export default router;
