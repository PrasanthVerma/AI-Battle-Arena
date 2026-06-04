import chat from "../Models/chat.model.js";
import message from "../Models/messages.model.js";
import useGraph from "../services/ai/graph/graph.ai.service.js";
import type { Request, Response } from "express";
import jwt from "jsonwebtoken";

export const ArenaController = async (
  req: Request,
  res: Response,
) => {
  try {
    const { problem, chatId, stream } =
      req.body;

    if (!problem) {
      return res.status(400).json({
        message: "Problem is required",
      });
    }

    let userId;

    if (req.user) {
      userId = (req.user as any)._id;
    } else if (req.cookies.token) {
      try {
        const decoded = jwt.verify(
          req.cookies.token,
          process.env.JWT_SECRET!,
        ) as {
          userId: string;
        };

        userId = decoded.userId;
      } catch {
        return res.status(401).json({
          message: "Invalid token",
        });
      }
    }

    if (!userId) {
      return res.status(401).json({
        message: "Unauthorized",
      });
    }

    // =========================
    // STREAMING MODE
    // =========================

    if (
      stream === true ||
      stream === "true"
    ) {

      res.setHeader(
        "Content-Type",
        "text/event-stream",
      );

      res.setHeader(
        "Cache-Control",
        "no-cache",
      );

      res.setHeader(
        "Connection",
        "keep-alive",
      );

      res.flushHeaders?.();

      const sendEvent = (
        event: string,
        data: unknown,
      ) => {

        res.write(
          `event: ${event}\n`,
        );

        res.write(
          `data: ${JSON.stringify(data)}\n\n`,
        );
      };

      try {

        const result =
          await useGraph({
            problem,

            uploaded_file_path:
              req.file?.path,

            sendEvent,
          });

        let targetChatId =
          chatId;

        if (targetChatId) {

          const existingChat =
            await chat.findOne({
              _id: targetChatId,
              userId,
            });

          if (!existingChat) {
            targetChatId = null;
          }
        }

        if (!targetChatId) {

          const newChat =
            await chat.create({
              userId,
              title: problem,
            });

          targetChatId =
            newChat._id;
        }

        const newMessage =
          await message.create({
            chatId:
              targetChatId,

            problem,

            solution_1:
              result.solution_1,

            solution_2:
              result.solution_2,

            judgement: {
              solution_1_score:
                result.judgement
                  .solution_1_score,

              solution_2_score:
                result.judgement
                  .solution_2_score,

              solution_1_reasoning:
                result.judgement
                  .solution_1_reasoning,

              solution_2_reasoning:
                result.judgement
                  .solution_2_reasoning,
            },
          });

        sendEvent(
          "complete",
          {
            ...result,

            chatId:
              targetChatId,

            messageId:
              newMessage._id,
          },
        );

        res.end();

        return;
      } catch (error) {

        sendEvent(
          "error",
          error instanceof Error
            ? error.message
            : "Unknown error",
        );

        res.end();

        return;
      }
    }

    // =========================
    // NORMAL MODE
    // =========================

    const result =
      await useGraph({
        problem,

        uploaded_file_path:
          req.file?.path,
      });

    let targetChatId =
      chatId;

    if (targetChatId) {

      const existingChat =
        await chat.findOne({
          _id: targetChatId,
          userId,
        });

      if (!existingChat) {
        targetChatId = null;
      }
    }

    if (!targetChatId) {

      const newChat =
        await chat.create({
          userId,
          title: problem,
        });

      targetChatId =
        newChat._id;
    }

    const newMessage =
      await message.create({
        chatId:
          targetChatId,

        problem,

        solution_1:
          result.solution_1,

        solution_2:
          result.solution_2,

        judgement: {
          solution_1_score:
            result.judgement
              .solution_1_score,

          solution_2_score:
            result.judgement
              .solution_2_score,

          solution_1_reasoning:
            result.judgement
              .solution_1_reasoning,

          solution_2_reasoning:
            result.judgement
              .solution_2_reasoning,
        },
      });

    return res.status(200).json({
      ...result,

      chatId:
        targetChatId,

      messageId:
        newMessage._id,
    });

  } catch (err) {

    console.error(
      "Error in ArenaController:",
      err,
    );

    return res.status(500).json({
      message:
        "Internal server error",
    });
  }
};