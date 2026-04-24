import express from "express";
import {
  RegisterController,
  LoginController,
  GetProfileController,
  LogoutController,
} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/profile", GetProfileController);
router.get("/logout",LogoutController);

export default router;
