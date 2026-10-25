
import type { GraphNode } from "@langchain/langgraph";
import { PineconeStore } from "@langchain/pinecone";
import { v4 as uuidv4 } from "uuid";

import { State } from "../graph/state.js";
import { pineconeIndex } from "../../../config/pinecone.js";
import { cohereEmbeddings } from "../model.service.js";

export const embeddingNode: GraphNode<typeof State> =
  async (state) => {

    if (!state.chunks.length) {
      throw new Error("No chunks found");
    }

    const namespace = `battle-${uuidv4()}`;

   


    await PineconeStore.fromTexts(
      state.chunks,

      state.chunks.map((_, index) => ({
        chunkIndex: index,
      })),

      cohereEmbeddings,

      {
        pineconeIndex,
        namespace,
      }
    );

    console.log(
      `Stored ${state.chunks.length} chunks in namespace: ${namespace}`
    );

    return {
      pinecone_namespace: namespace,
    };
  };

