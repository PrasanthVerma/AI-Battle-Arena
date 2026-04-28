import express from "express";
import { ArenaController } from "../Controllers/arena.controller.js";

const router = express.Router();

router.post("/use-graph", ArenaController);

export default router;
