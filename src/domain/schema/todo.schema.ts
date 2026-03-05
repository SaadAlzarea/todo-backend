import mongoose, { Schema } from "mongoose";
import { ETodoPriority, ETodoStatus } from "../../definition";
import { generatedId } from "../../utils";
import { ITodoModel } from "../models";

const TodoSchema = new Schema<ITodoModel>(
    {
        generatedId: {
            type: String,
            default: generatedId,
        },
        title: {
            type: String,
            required: true,
        },
        body: {
            type: String,
            required: true,
        },
        progress: {
            type: String,
            required: false,
        },
        priority: {
            type: String,
            enum: Object.values(ETodoPriority),
            required: true,
        },
        status: {
            type: String,
            enum: Object.values(ETodoStatus),
            required: true,
        },
        userId: { type: String, required: true },
    },
    { timestamps: true },
);

export const TodoModel = mongoose.model("Todo", TodoSchema);
