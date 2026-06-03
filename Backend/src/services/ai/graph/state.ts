import z from "zod";
import { StateSchema } from "@langchain/langgraph";

export const State = new StateSchema({
  problem: z.string().default(""),

  uploaded_file_type: z.string().default(""),

  uploaded_file_path: z.string().optional(),

  extracted_text: z.string().default(""),

  retrieved_context: z.array(z.string()).default([]),

  solution_1: z.string().default(""),
  solution_2: z.string().default(""),
  judgement: z.object({
    solution_1_score: z.number().default(0),
    solution_2_score: z.number().default(0),
    solution_1_reasoning: z.string().default(""),
    solution_2_reasoning: z.string().default(""),
  }),
});
