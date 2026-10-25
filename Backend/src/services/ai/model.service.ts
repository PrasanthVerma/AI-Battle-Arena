// import config from "../src";
import { ChatGoogleGenerativeAI } from "@langchain/google-genai";
import { ChatMistralAI } from "@langchain/mistralai"; // replaced — Mistral API key has no quota
import { ChatCohere , CohereEmbeddings } from "@langchain/cohere";
import { ChatOpenRouter } from "@langchain/openrouter";
import "dotenv";

export const geminiModel = new ChatGoogleGenerativeAI({
  model: "gemini-3.8-flash", // judge model 
  apiKey: process.env.GEMINI_API_KEY,
});

// Using Gemini Flash as the second arena model (Mistral API key exceeded quota)
// export const mistralModel = new ChatMistralAI({
//   model: "mistral-small-2603", // arena Model 1 — correct model for this API key
//   apiKey: process.env.MISTRAL_API_KEY,
// });

export const openrouterModel = new ChatOpenRouter({
  model: "openrouter/free",
  apiKey: process.env.OPENROUTER_API_KEY,
});

export const cohereModel = new ChatCohere({
  model: "command-a-03-2025",
  apiKey: process.env.COHERE_API_KEY,
});

export const cohereEmbeddings = new CohereEmbeddings({
  model: "embed-english-v3.0",
  apiKey: process.env.COHERE_API_KEY,
});
