import mongoose, { Schema } from "mongoose";
import { EUserRole } from "../../definition";
import { generatedId } from "../../utils";
import { IRegisterModel } from "../models";

const RegisterSchema = new Schema<IRegisterModel>(
    {
        generatedId: {
            type: String,
            default: generatedId,
        },
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
        role: {
            type: String,
            enum: EUserRole,
            default: EUserRole.USER,
        },
    },
    { timestamps: true },
);

export const RegisterUserModel = mongoose.model("Register", RegisterSchema);
