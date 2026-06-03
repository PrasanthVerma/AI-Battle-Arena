import express from "express";
import { ArenaController , battleWithFileController } from "../Controllers/arena.controller.js";
import multer from "multer";
import { upload } from "../config/multer.js";

const router = express.Router();


router.post("/use-graph", ArenaController);
router.post("/battle-with-file",upload.single("file"),battleWithFileController)


export default router;
