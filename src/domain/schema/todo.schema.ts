import mongoose, { Schema } from "mongoose";
import { ETodoPriority, ETodoStatus } from "../../definition/enums/todo.enum";
import { ITodoModel } from "../models/todo.model";
import { generatedId } from "../../utils/id-generator.util";

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
    },
    { timestamps: true },
);

export const Todo = mongoose.model("Todo", TodoSchema);
