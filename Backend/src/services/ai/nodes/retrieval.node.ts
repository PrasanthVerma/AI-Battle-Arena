import type { GraphNode } from "@langchain/langgraph";
import { OpenAIEmbeddings } from "@langchain/openai";
import { PineconeStore } from "@langchain/pinecone";
import { State } from "../graph/state.js";
import { pineconeIndex } from "../../../config/pinecone.js";

export const retrievalNode: GraphNode<typeof State> = async (state) => {
  if (!state.pinecone_namespace) {
    throw new Error("No Pinecone namespace found");
  }

  const embeddings = new OpenAIEmbeddings({
    model: "text-embedding-3-small",
  });

  const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
    pineconeIndex,

    namespace: state.pinecone_namespace,
  });

  const retriever = vectorStore.asRetriever({
    k: 4,
  });

  const relevantDocs = await retriever.invoke(state.problem);

  const retrievedContext = relevantDocs.map((doc) => doc.pageContent);

  console.log("RETRIEVED CONTEXT:", retrievedContext);

  return {
    retrieved_context: retrievedContext,
  };
};
