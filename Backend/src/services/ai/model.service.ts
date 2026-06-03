// import config from "../src";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere , CohereEmbeddings } from "@langchain/cohere";
import "dotenv";

export const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: process.env.GEMINI_API_KEY,
});

export const mistralModel = new ChatMistralAI({
  model: "mistral-medium",
  apiKey: process.env.MISTRAL_API_KEY,
});

export const cohereModel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: process.env.COHERE_API_KEY,
});

export const cohereEmbeddings = new CohereEmbeddings({
  apiKey: process.env.COHERE_API_KEY!,
  model: "embed-english-v3.0",
});
