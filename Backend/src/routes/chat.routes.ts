import express from "express";
import { GetChatsController, GetChatMessagesController } from "../Controllers/chat.controller.js";

const router = express.Router();

router.get("/", GetChatsController);
router.get("/:chatId", GetChatMessagesController);

export default router;
