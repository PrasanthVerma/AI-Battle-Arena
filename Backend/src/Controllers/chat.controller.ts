import chat from "../Models/chat.model.js";
import message from "../Models/messages.model.js";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

function getUserId(req: Request): string | null {
  if (req.user) return (req.user as any)._id?.toString() ?? null;
  if (req.cookies.token) {
    try {
      const decoded = jwt.verify(req.cookies.token, process.env.JWT_SECRET!) as { userId: string };
      return decoded.userId;
    } catch {
      return null;
    }
  }
  return null;
}

// GET /api/chats — returns all chats for the logged-in user
export const GetChatsController = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const chats = await chat
      .find({ userId })
      .sort({ createdAt: -1 })
      .select("_id title createdAt");
    return res.status(200).json({ chats });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

// GET /api/chats/:chatId — returns messages for a specific chat
export const GetChatMessagesController = async (req: Request, res: Response) => {
  const userId = getUserId(req);
  if (!userId) return res.status(401).json({ message: "Unauthorized" });

  try {
    const chatDoc = await chat.findOne({ _id: req.params.chatId, userId });
    if (!chatDoc) return res.status(404).json({ message: "Chat not found" });

    const messages = await message.find({ chatId: req.params.chatId }).sort({ createdAt: 1 });
    return res.status(200).json({ chat: chatDoc, messages });
  } catch (err) {
    return res.status(500).json({ message: "Internal server error" });
  }
};
