import chat from "../Models/chat.model.js";
import message from "../Models/messages.model.js";
import useGraph from "../services/graph.ai.service.js";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const ArenaController = async (req: Request, res: Response) => {
  try {
    const { problem } = req.body;
    let userId;
    if (req.user) {
      userId = (req.user as any)._id;
    } else if (req.cookies.token) {
      try {
        const decoded = jwt.verify(
          req.cookies.token,
          process.env.JWT_SECRET!,
        ) as { userId: string };
        userId = decoded.userId;
      } catch (err) {
        return res.status(401).json({ message: "Invalid token" });
      }
    }

    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const result = await useGraph(problem);
    const newChat = await chat.create({
      userId: userId,
      title: problem,
    });

    const newMessage = await message.create({
      chatId: newChat._id,
      problem: problem,
      solution_1: result.solution_1,
      solution_2: result.solution_2,
      judgement: {
        solution_1_score: result.judgement.solution_1_score,
        solution_2_score: result.judgement.solution_2_score,
        solution_1_reasoning: result.judgement.solution_1_reasoning,
        solution_2_reasoning: result.judgement.solution_2_reasoning,
      },
    });

    return res.status(200).json({
      ...result,
      chatId: newChat._id,
      messageId: newMessage._id,
    });
  } catch (err) {
    console.error("Error in ArenaController:", err);
    return res.status(500).json({ message: "Internal server error" });
  }
};
