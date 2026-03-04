import mongoose, { mongo, Schema } from "mongoose";
import { IRegisterModel } from "../models/register.model";
import { generatedId } from "../../utils/id-generator.util";
import { EUserRole } from "../../definition/enums/userRole.role";

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
