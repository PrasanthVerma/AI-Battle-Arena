import type { GraphNode } from "@langchain/langgraph";
import fs from "fs/promises";
import path from "path";
import {PDFParse} from "pdf-parse";
import mammoth from "mammoth";
import Tesseract from "tesseract.js";
import { State } from "../graph/state.js";

const extractTextFromPDF = async (filePath:string)=>{
    const buffer = await fs.readFile(filePath);
    const uint8Array = new Uint8Array(buffer);
    const data = await new PDFParse(uint8Array);
    const result = await data.getText()
    return result.text;

}

const extractTextFromDOCX= async(filePath:string)=>{
    const result = await mammoth.extractRawText({
        path:filePath,
    });
    return result.value;
}

const extractTextfromTXT = async(filePath:string)=>{
    return await fs.readFile(filePath,"utf-8");
}

const extractTextFromImage = async(filePath:string)=>{
    const result = await Tesseract.recognize(filePath,"eng");

    return result.data.text;
}

export const fileProcessingNode : GraphNode<typeof State> = async(state)=>{

    if(!state.uploaded_file_path){
        return{}
    }

    const filePath = state.uploaded_file_path;

    const extension = path.extname(filePath).toLowerCase();

    let extractedText = "";


try{
    switch (extension){

        case ".pdf":
            extractedText= await extractTextFromPDF(filePath);
            break;
        
        case ".docx":
            extractedText = await extractTextFromDOCX(filePath);
            break;

        case ".txt":
            extractedText = await extractTextfromTXT(filePath);
            break;
        
        case ".png":
        case ".jpg":
        case ".jpeg":
            extractedText = await extractTextFromImage(filePath);
            break;
        
        default:
            throw new Error ("Unsupported file type");
    }
    }catch(err){
        console.log(err);
    }

    return {
        extracted_text : extractedText,

        uploaded_file_type : extension,
    };
};