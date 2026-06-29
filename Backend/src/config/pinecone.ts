
import { Pinecone } from "@pinecone-database/pinecone";
import dotenv from "dotenv";

dotenv.config();

const apiKey = process.env.PINECONE_API_KEY;
const indexName = process.env.PINECONE_INDEX_NAME;

if (!apiKey) {
  throw new Error(
    "[Pinecone] Missing required environment variable: PINECONE_API_KEY. " +
    "Please set it in your Render dashboard under Environment Variables."
  );
}

if (!indexName) {
  throw new Error(
    "[Pinecone] Missing required environment variable: PINECONE_INDEX_NAME. " +
    "Please set it in your Render dashboard under Environment Variables."
  );
}

export const pinecone = new Pinecone({ apiKey });

export const pineconeIndex = pinecone.index(indexName);
