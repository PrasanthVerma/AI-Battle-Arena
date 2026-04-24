import config from "../config/config.js";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai";
import { ChatCohere } from "@langchain/cohere";

export const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-2.5-flash-lite",
  apiKey: config.GEMINI_API_KEY,
});

export const mistralModel = new ChatMistralAI({
  model: "mistral-medium",
  apiKey: config.MISTRAL_API_KEY,
});

export const cohereModel = new ChatCohere({
    model: "command-a-03-2025",
    apiKey: config.COHERE_API_KEY,
})