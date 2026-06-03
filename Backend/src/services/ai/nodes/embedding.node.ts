import type { GraphNode } from "@langchain/langgraph";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { v4 as uuidv4 } from "uuid";
import { State } from "../graph/state.js";
import { pineconeIndex } from "../../../config/pinecone.js";

export const embeddingNode:GraphNode<typeof State> = 
async (state) => {
  if (!state.chunks.length) {
    throw new Error("no chunks found");
  }

  const namespace = `battle=${uuidv4()}`;

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });

  await PineconeStore.fromTexts(
    state.chunks,

    state.chunks.map((_, index) => ({
      chunkIndex: index,
    })),
    embeddings,
    {
      pineconeIndex,
      namespace,
    },
  );

  console.log("Stored embeddings in namespace:", namespace);
  return { pinecone_namespace: namespace };
};
