import mongoose, { mongo, Schema } from "mongoose";
import { IRegisterModel } from "../models/register.model";

const RegisterSchema = new Schema<IRegisterModel>(
    {
        username: {
            type: String,
            required: true,
            unique: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
        },
        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

export const RegisterUser = mongoose.model("Register", RegisterSchema);
