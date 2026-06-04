import express from "express";
import { ArenaController } from "../Controllers/arena.controller.js";
import multer from "multer";
import { upload } from "../config/multer.js";

const router = express.Router();


router.post("/use-graph",upload.single("file"), ArenaController);



export default router;
