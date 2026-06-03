import type { GraphNode } from "@langchain/langgraph";
import {RecursiveCharacterTextSplitter} from "@langchain/textsplitters"
import { State } from "../graph/state.js";


export const chunkingNode:GraphNode<typeof State> =
async (state) =>{

    if (!state.extracted_text){
        throw new Error("No extracted text found");
    }

    const splitter = new RecursiveCharacterTextSplitter({
        chunkSize:1000,
        chunkOverlap:200,
    })

    const splitDocuments = await splitter.createDocuments([
        state.extracted_text,
    ])

    const chunks = splitDocuments.map((doc)=>doc.pageContent);

    console.log("CHUNKS",chunks)

    return {
        chunks
    }
}