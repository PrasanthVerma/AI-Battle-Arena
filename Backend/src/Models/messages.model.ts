import mongoose from "mongoose";
import { type } from "node:os";

const messageSchema = new mongoose.Schema({
    chatId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Chat",
        required: true
    },
    problem: {
        type: String,
        required: true,
    },
    solution_1: {
        type: String,
        required: true,
    },
    solution_2: {
        type: String,
        required: true,
    },
    judgement: {
        solution_1_score: {
            type: Number,
            required: true,
        },
        solution_2_score: {
            type: Number,
            required: true,
        },
        solution_1_reasoning: {
            type: String,
            required: true,
        },
        solution_2_reasoning: {
            type: String,
            required: true,
        },
    }

}
,{
    timestamps: true
})


const message = mongoose.model("Message", messageSchema);

export default message;