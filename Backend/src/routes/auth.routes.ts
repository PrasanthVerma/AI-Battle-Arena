import express from "express";
import {
  RegisterController,
  LoginController,
  GetProfileController,
} from "../Controllers/auth.controller.js";

const router = express.Router();

router.post("/register", RegisterController);
router.post("/login", LoginController);
router.get("/profile", GetProfileController);

export default router;
